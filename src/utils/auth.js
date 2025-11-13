const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRES_AT_KEY = 'accessTokenExpiresAt';
const USER_KEY = 'authUser';
const LEGACY_USER_KEY = 'user';

const API_BASE_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5001';

const decodeToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
    const decoded =
      typeof atob === 'function'
        ? atob(padded)
        : Buffer.from(padded, 'base64').toString('binary');
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode token payload:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const bufferSeconds = 30;
  const expiryMs = decoded.exp * 1000;
  return Date.now() >= expiryMs - bufferSeconds * 1000;
};

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) || null;

const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY) || null;

const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY) || localStorage.getItem(LEGACY_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const storeLegacyUser = (user) => {
  if (user) {
    localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LEGACY_USER_KEY);
  }
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.warn('Refresh token request failed');
      return null;
    }

    const data = await response.json();
    if (!data?.token) {
      return null;
    }

    storeAuth(data.token, refreshToken, data.expiresAt, getStoredUser());
    return data.token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const clearAuth = async () => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.warn('Failed to notify server about logout:', error);
    }
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LEGACY_USER_KEY);
};

export const storeAuth = (accessToken, refreshToken, expiresAt, user) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  if (expiresAt) {
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_KEY, expiresAt);
  }
  try {
    if (user) {
      const serialized = JSON.stringify(user);
      localStorage.setItem(USER_KEY, serialized);
      storeLegacyUser(user);
    } else {
      localStorage.removeItem(USER_KEY);
      storeLegacyUser(null);
    }
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
};

const ensureValidAccessToken = async (navigate) => {
  let token = getToken();

  if (!token || isTokenExpired(token)) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      await clearAuth();
      if (navigate) {
        navigate('/login');
      }
      throw new Error('Session expired. Please login again.');
    }
    token = refreshed;
  }

  return token;
};

export const authenticatedFetch = async (url, options = {}, navigate = null) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  const token = await ensureValidAccessToken(navigate);
  config.headers.Authorization = `Bearer ${token}`;

  let response = await fetch(url, config);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      await clearAuth();
      if (navigate) {
        navigate('/login');
      }
      throw new Error('Session expired. Please login again.');
    }

    config.headers.Authorization = `Bearer ${refreshed}`;
    response = await fetch(url, config);
  }

  return response;
};

export const checkTokenAndRedirect = async (navigate) => {
  try {
    await ensureValidAccessToken(navigate);
    return true;
  } catch (error) {
    console.warn('Token validation failed:', error);
    return false;
  }
};



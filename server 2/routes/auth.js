import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { dbRun, dbGet, dbAll } from '../utils/database.js';

const router = express.Router();

// Generate secure random refresh token
const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Generate access token (short-lived)
const generateAccessToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' } // Access token expires in 1 hour
  );
};

// Generate refresh token (long-lived)
const generateRefreshTokenWithExpiry = async (userId) => {
  const token = generateRefreshToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // Refresh token expires in 30 days
  
  // Store refresh token in database
  await dbRun(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)`,
    [userId, token, expiresAt.toISOString()]
  );
  
  return { token, expiresAt };
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, company, organization, industry, role, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await dbRun(
      `INSERT INTO users (name, email, password, phone, company, organization, industry, role, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, phone || null, company || null, organization || company || null, industry || null, role || null, location || null]
    );

    // Log activity
    await dbRun(
      `INSERT INTO activities (user_id, action, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [result.lastID, 'register', req.ip, req.get('user-agent') || '']
    );

    // Generate access token (short-lived)
    const accessToken = generateAccessToken(result.lastID, email);
    
    // Generate refresh token (long-lived, stored in database)
    const { token: refreshToken, expiresAt } = await generateRefreshTokenWithExpiry(result.lastID);

    res.status(201).json({
      message: 'User registered successfully',
      token: accessToken, // Access token for API requests
      refreshToken: refreshToken, // Refresh token for getting new access tokens
      expiresAt: expiresAt.toISOString(), // When refresh token expires
      user: {
        id: result.lastID,
        name,
        email,
        company: company || organization,
        organization: organization || company
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await dbRun('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    // Log activity
    await dbRun(
      `INSERT INTO activities (user_id, action, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [user.id, 'login', req.ip, req.get('user-agent') || '']
    );

    // Generate access token (short-lived)
    const accessToken = generateAccessToken(user.id, user.email);
    
    // Generate refresh token (long-lived, stored in database)
    const { token: refreshToken, expiresAt } = await generateRefreshTokenWithExpiry(user.id);

    res.json({
      message: 'Login successful',
      token: accessToken, // Access token for API requests
      refreshToken: refreshToken, // Refresh token for getting new access tokens
      expiresAt: expiresAt.toISOString(), // When refresh token expires
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        organization: user.organization,
        industry: user.industry,
        role: user.role,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh access token using refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Find refresh token in database
    const storedToken = await dbGet(
      'SELECT * FROM refresh_tokens WHERE token = ?',
      [refreshToken]
    );

    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Check if refresh token has expired
    const expiresAt = new Date(storedToken.expires_at);
    if (expiresAt < new Date()) {
      // Delete expired token
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
      return res.status(401).json({ error: 'Refresh token has expired' });
    }

    // Get user information
    const user = await dbGet('SELECT id, email FROM users WHERE id = ?', [storedToken.user_id]);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user.id, user.email);

    res.json({
      message: 'Token refreshed successfully',
      token: accessToken,
      expiresAt: expiresAt.toISOString()
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout - invalidate refresh token
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete refresh token from database
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


    await dbRun(
      `INSERT INTO activities (user_id, action, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [user.id, 'login', req.ip, req.get('user-agent') || '']
    );

    // Generate access token (short-lived)
    const accessToken = generateAccessToken(user.id, user.email);
    
    // Generate refresh token (long-lived, stored in database)
    const { token: refreshToken, expiresAt } = await generateRefreshTokenWithExpiry(user.id);

    res.json({
      message: 'Login successful',
      token: accessToken, // Access token for API requests
      refreshToken: refreshToken, // Refresh token for getting new access tokens
      expiresAt: expiresAt.toISOString(), // When refresh token expires
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        organization: user.organization,
        industry: user.industry,
        role: user.role,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh access token using refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Find refresh token in database
    const storedToken = await dbGet(
      'SELECT * FROM refresh_tokens WHERE token = ?',
      [refreshToken]
    );

    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Check if refresh token has expired
    const expiresAt = new Date(storedToken.expires_at);
    if (expiresAt < new Date()) {
      // Delete expired token
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
      return res.status(401).json({ error: 'Refresh token has expired' });
    }

    // Get user information
    const user = await dbGet('SELECT id, email FROM users WHERE id = ?', [storedToken.user_id]);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user.id, user.email);

    res.json({
      message: 'Token refreshed successfully',
      token: accessToken,
      expiresAt: expiresAt.toISOString()
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout - invalidate refresh token
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete refresh token from database
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


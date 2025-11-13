import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbRun, dbGet, dbAll } from '../utils/database.js';

const router = express.Router();

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

    // Generate token
    const token = jwt.sign({ userId: result.lastID, email }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
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

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
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

export default router;


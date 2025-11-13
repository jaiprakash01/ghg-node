import express from 'express';
import { dbRun, dbGet } from '../utils/database.js';

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, mobile, message, captcha_code } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('user-agent') || '';

    const result = await dbRun(
      `INSERT INTO contacts (name, email, mobile, message, captcha_code, ip_address, user_agent, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
      [name, email, mobile || null, message, captcha_code || null, ip_address, user_agent]
    );

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: result.lastID
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


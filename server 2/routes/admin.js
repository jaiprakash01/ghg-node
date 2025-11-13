import express from 'express';
import { dbRun, dbGet, dbAll } from '../utils/database.js';

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await dbAll('SELECT id, name, email, phone, company, organization, industry, role, location, created_at, last_login, payment_status FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all assessments
router.get('/assessments', async (req, res) => {
  try {
    const assessments = await dbAll(`
      SELECT 
        a.id,
        a.user_id,
        u.name as user_name,
        u.email as user_email,
        a.total_score,
        a.max_score,
        a.accuracy,
        a.governance_score,
        a.social_score,
        a.environment_score,
        a.esg_plus_score,
        a.grade,
        a.level,
        a.recommendations,
        a.payment_status,
        a.created_at
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);

    res.json(assessments.map(assessment => ({
      ...assessment,
      recommendations: JSON.parse(assessment.recommendations || '[]')
    })));
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get assessment details
router.get('/assessment-details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await dbGet(`
      SELECT 
        a.*,
        u.name as user_name,
        u.email as user_email,
        u.company as user_company,
        u.role as user_role
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ?
    `, [id]);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.json({
      ...assessment,
      recommendations: JSON.parse(assessment.recommendations || '[]'),
      answers: JSON.parse(assessment.answers || '[]')
    });
  } catch (error) {
    console.error('Get assessment details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await dbAll(`
      SELECT 
        a.id,
        a.user_id,
        u.name as user_name,
        u.email as user_email,
        a.action,
        a.details,
        a.ip_address,
        a.user_agent,
        a.created_at
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);

    res.json(activities.map(activity => ({
      ...activity,
      details: activity.details ? JSON.parse(activity.details) : null
    })));
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user activities
router.get('/user-activities/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await dbAll(`
      SELECT 
        a.id,
        a.user_id,
        u.name as user_name,
        u.email as user_email,
        a.action,
        a.details,
        a.ip_address,
        a.user_agent,
        a.created_at
      FROM activities a
      JOIN users u ON a.user_id = u.id
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC
    `, [userId]);

    res.json(activities.map(activity => ({
      ...activity,
      details: activity.details ? JSON.parse(activity.details) : null
    })));
  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await dbAll('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update contact status
router.put('/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    await dbRun('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
    const contact = await dbGet('SELECT * FROM contacts WHERE id = ?', [id]);

    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


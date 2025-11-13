import express from 'express';
import { dbRun, dbGet, dbAll } from '../utils/database.js';

const router = express.Router();

// Calculate grade and level from score
const calculateGradeAndLevel = (totalScore) => {
  let grade, level;
  
  if (totalScore >= 136) {
    grade = 'A+';
    level = 'Expert';
  } else if (totalScore >= 121) {
    grade = 'A';
    level = 'Advanced';
  } else if (totalScore >= 91) {
    grade = 'B+';
    level = 'Proficient';
  } else if (totalScore >= 61) {
    grade = 'B';
    level = 'Intermediate';
  } else if (totalScore >= 31) {
    grade = 'C+';
    level = 'Beginner';
  } else {
    grade = 'C';
    level = 'Novice';
  }
  
  return { grade, level };
};

// Generate recommendations based on scores
const generateRecommendations = (scores) => {
  const recommendations = [];
  
  if (scores.environment < 50) {
    recommendations.push('Improve environmental practices and sustainability measures');
  }
  if (scores.social < 50) {
    recommendations.push('Enhance social responsibility and employee welfare programs');
  }
  if (scores.governance < 50) {
    recommendations.push('Strengthen governance policies and compliance measures');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Continue maintaining excellent ESG standards');
  }
  
  return recommendations;
};

// Submit assessment
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers, scores } = req.body;

    if (!userId || !answers || !scores) {
      return res.status(400).json({ error: 'User ID, answers, and scores are required' });
    }

    const { totalScore, maxScore, accuracy, byCategory } = scores;
    const { grade, level } = calculateGradeAndLevel(totalScore);
    const recommendations = generateRecommendations({
      environment: byCategory.Environment?.percentage || 0,
      social: byCategory.Social?.percentage || 0,
      governance: byCategory.Governance?.percentage || 0
    });

    // Insert assessment
    const result = await dbRun(
      `INSERT INTO assessments (
        user_id, total_score, max_score, accuracy,
        governance_score, social_score, environment_score, esg_plus_score,
        grade, level, recommendations, answers
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        totalScore,
        maxScore,
        accuracy,
        byCategory.Governance?.score || 0,
        byCategory.Social?.score || 0,
        byCategory.Environment?.score || 0,
        scores.esgPlusScore || 0,
        grade,
        level,
        JSON.stringify(recommendations),
        JSON.stringify(answers)
      ]
    );

    // Log activity
    await dbRun(
      `INSERT INTO activities (user_id, action, details, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?)`,
      [
        userId,
        'assessment_completed',
        JSON.stringify({
          assessment_id: result.lastID,
          total_score: totalScore,
          max_score: maxScore,
          grade,
          level
        }),
        req.ip,
        req.get('user-agent') || ''
      ]
    );

    res.status(201).json({
      message: 'Assessment submitted successfully',
      assessmentId: result.lastID,
      grade,
      level,
      recommendations
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's assessments
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const assessments = await dbAll(
      `SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    res.json(assessments.map(assessment => ({
      ...assessment,
      recommendations: JSON.parse(assessment.recommendations || '[]'),
      answers: JSON.parse(assessment.answers || '[]')
    })));
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


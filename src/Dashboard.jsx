import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isTokenExpired, clearAuth, authenticatedFetch, checkTokenAndRedirect } from './utils/auth.js';
import {
  FileText,
  Award,
  TrendingUp,
  Leaf,
  Users,
  Shield,
  BarChart3,
  PieChart,
  User,
  Calendar,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
  Target,
  AlertTriangle,
  Home,
  Trophy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Questions data (same as Assessment.jsx)
const questions = [
  { id: 1, category: 'Environment', text: 'Have you implemented actions to reduce energy consumption in workplace?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Trainings & actions on energy conservation, renewable energy, and minimizing energy wastage.' },
  { id: 2, category: 'Environment', text: 'Have you measured your Scope 1 & Scope 2 GHG?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Total quantity of Greenhouse Gases (GHG) under Scope 1 (direct emissions) & Scope 2 (indirect emissions from purchased electricity).' },
  { id: 3, category: 'Environment', text: 'Do you use Electric Vehicles for company operations & Dispatch?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Use of Electric Vehicles (EVs) for official work, reducing reliance on fossil fuels.' },
  { id: 4, category: 'Environment', text: 'Do you provide any energy efficient employee commute facility?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Use of energy-efficient or pooled transport solutions for employee travel.' },
  { id: 5, category: 'Environment', text: 'Have you provided training to employees on Energy Conservation?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training on reducing electricity use, improving efficiency of systems, and behavioral energy-saving practices.' },
  { id: 6, category: 'Environment', text: 'Have you provided training to employees on Environment Protection?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Sessions on pollution control, waste management, biodiversity conservation, and eco-friendly practices.' },
  { id: 7, category: 'Environment', text: 'Have you provided training to employees on Climate Change and Actions?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Awareness and training on climate change science, impacts, and mitigation/adaptation measures.' },
  { id: 8, category: 'Environment', text: 'Have you provided training to employees on GHG Accounting & Mitigation?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Capacity building on GHG calculation, emission factors, ISO 14064, and strategies to reduce emissions.' },
  { id: 9, category: 'Environment', text: 'Do you have facilities at place to prevent noise pollution?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Use of noise barriers, silencers, acoustic panels, and compliance with ambient noise norms.' },
  { id: 10, category: 'Environment', text: 'Do you recycle your paper & plastic waste?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Segregation and recycling of office and industrial plastic and paper through authorized recyclers.' },
  { id: 11, category: 'Environment', text: 'Do you recycle your e-waste?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Disposal of electronic waste through government-authorized e-waste handlers.' },
  { id: 12, category: 'Environment', text: 'Do you publicly announce your GHG emissions and Targets?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Disclosure of carbon emissions and reduction targets via sustainability reports or websites.' },
  { id: 13, category: 'Environment', text: 'Do you regularly submit environmental audit reports to the State Pollution Control Board?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Submission of Form V and other required reports to the State Pollution Control Board (SPCB) as per norms.' },
  { id: 14, category: 'Environment', text: 'Do you follow any recognized GHG reporting standards (e.g., ISO 14064, GHG Protocol)?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Use of ISO 14064 (International Standard for GHG accounting) or the Greenhouse Gas Protocol for emissions reporting.' },
  { id: 15, category: 'Environment', text: 'Do you have actions plan in place to reduce GHG emissions?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Implemented measures such as renewable energy, efficiency upgrades, or emission offset programs.' },
  { id: 16, category: 'Environment', text: 'Are you registered with CPCB or SPCB for ERP?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Registration with Central Pollution Control Board (CPCB) or State Pollution Control Board (SPCB) for Extended Producer Responsibility (ERP).' },
  { id: 17, category: 'Environment', text: 'Have you measured your annual water consumption?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Total annual water used, including process, domestic, and auxiliary consumption.' },
  { id: 18, category: 'Environment', text: 'Do you have actions in place to reduce water consumption?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Steps like water-efficient fixtures, recycling, metering, and awareness programs.' },
  { id: 19, category: 'Environment', text: 'Do you have water conservation facilities at place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Examples: Rainwater harvesting, groundwater recharge, water sensors, smart meters.' },
  { id: 20, category: 'Environment', text: 'Are you Certified for ISO 14001-2015?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certification for Environmental Management System (EMS) under ISO 14001:2015 standard.' },
  { id: 21, category: 'Environment', text: 'Are you certified for ISO 50001-2018?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certification for Energy Management System (EnMS) under ISO 50001:2018 standard.' },
  { id: 22, category: 'Environment', text: 'Have you conducted Life Cycle Assessment for your products?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "Analysis of product's environmental impact across its life cycle—from raw material to disposal." },
  { id: 23, category: 'Environment', text: 'Are you pursuing any sustainability certifications?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certifications like Ecovadis, Science-Based Targets initiative (SBTi), Global Reporting Initiative (GRI), Sustainability Accounting Standards Board (SASB), International Sustainability Standards Board (ISSB), or Business Responsibility and Sustainability Reporting (BRSR).' },
  { id: 24, category: 'Environment', text: 'Do you engage stakeholders for environmental issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Engagement with communities, buyers, regulators, and suppliers on environmental topics.' },
  { id: 25, category: 'Environment', text: 'Do you monitor your stack emissions regularly?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Regular monitoring of emissions from chimneys, Diesel Generator (DG) sets, boilers, etc.' },
  { id: 26, category: 'Environment', text: 'Are Your stack emissions within prescribed limits as per SPCB consent?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Emissions are within limits permitted under SPCB Consent to Operate.' },
  { id: 27, category: 'Environment', text: 'Have you provided training to employees on ISO 14001-2015?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training on EMS policies, compliance obligations, audits, and continual improvement under ISO 14001.' },
  { id: 28, category: 'Environment', text: 'Have you provided training to employees on ISO 50001-2018?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training on energy planning, monitoring, and control systems under ISO 50001.' },
  { id: 29, category: 'Environment', text: 'Do you have trained Internal auditors for Environmental Management and Issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Staff trained to audit EMS implementation, identify non-conformities, and recommend improvements.' },
  { id: 30, category: 'Environment', text: 'Do you segregate dry and wet waste?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Separate collection and handling of biodegradable (wet) and non-biodegradable (dry) waste.' },
  { id: 31, category: 'Environment', text: 'Do you have documented Policy or Procedure on Environmental issues and protection?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Formal documentation of policies, responsibilities, and actions on environmental protection.' },
  { id: 32, category: 'Environment', text: 'Do you communicate environment policy internally and externally with stakeholders?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Sharing EMS policy with staff, suppliers, contractors, and regulatory bodies.' },
  { id: 33, category: 'Environment', text: 'Have you identified & documented environmental related sustainable issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Documentation of key sustainability concerns like energy, water, waste, and pollution.' },
  { id: 34, category: 'Environment', text: 'Have you implemented action plan against identified environmental sustainable issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Implementation of reduction, mitigation, or improvement actions for key sustainability issues.' },
  { id: 35, category: 'Environment', text: 'Have you carried out effective aspect - impact analysis?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Assessment of environmental aspects (e.g., emissions, waste) and their impacts on environment for prioritization and control.' },
  { id: 36, category: 'Social', text: 'Do you have a documented employee handbook in place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'An employee handbook that outlines company policies, goals, organizational hierarchy, working hours, leave policies, holidays, and other terms of employment.' },
  { id: 37, category: 'Social', text: 'Do you have a documented policy on fair treatment, equal employment, two-way communication in place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A formal policy ensuring equal opportunities, non-discrimination, and transparent communication between employees and management.' },
  { id: 38, category: 'Social', text: 'Do you have a documented policy or SOP on anti-bribery and data protection?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Standard Operating Procedures (SOPs) and policies addressing anti-bribery measures and ensuring compliance with data protection regulations (e.g., GDPR).' },
  { id: 39, category: 'Social', text: 'Do you have a documented SOP for grievance mechanism?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A standardized procedure for addressing employee complaints, grievances, and disputes in a fair and timely manner.' },
  { id: 40, category: 'Social', text: 'Do you have a documented SOP for whistleblower?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A structured procedure for employees to report unethical practices or misconduct without fear of retaliation.' },
  { id: 41, category: 'Social', text: 'Do you provide training to your employees on health and safety practices at workplace?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Regular training sessions on general safety protocols, workplace hazards, emergency procedures, and risk mitigation strategies.' },
  { id: 42, category: 'Social', text: 'Do you provide training to your employees on social issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training on relevant social issues such as diversity, inclusion, and ethical workplace behavior.' },
  { id: 43, category: 'Social', text: 'Do you have a documented Policy on POSH (Prevention of Sexual Harassment)?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A documented policy outlining the steps to prevent, address, and resolve incidents of sexual harassment in the workplace.' },
  { id: 44, category: 'Social', text: 'Do you provide health insurance or mediclaim to all your employees?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Provision of health insurance or mediclaim benefits to ensure the health and well-being of employees.' },
  { id: 45, category: 'Social', text: 'Do you provide life insurance to employees?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "Offering life insurance benefits to provide financial security for employees and their families in case of unforeseen circumstances." },
  { id: 46, category: 'Social', text: 'Do you provide other statutory benefits to employees like PF, Gratuity & ESIC?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Compliance with statutory employee benefits like Provident Fund (PF), Gratuity, and Employee State Insurance Corporation (ESIC).' },
  { id: 47, category: 'Social', text: 'Do you conduct medical fitness test of employees once in a year?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "Annual medical check-ups to assess employees' fitness levels and ensure health standards are met." },
  { id: 48, category: 'Social', text: 'Do you organize employee engagement events in organization?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Activities and events designed to improve employee morale, teamwork, and overall engagement within the company.' },
  { id: 49, category: 'Social', text: 'Do you have a system of annual formal appraisal in place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A structured annual performance review process to assess employee performance, set goals, and provide feedback for professional growth.' },
  { id: 50, category: 'Social', text: 'Do you provide Personal Protective Equipment (PPE) to employees?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "Provision of necessary PPE (e.g., helmets, gloves, safety glasses) to ensure employees' safety while performing their duties." },
  { id: 51, category: 'Social', text: 'Do you provide training on Personal Protective Equipment (PPE) and Fire drills to employees?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training on the proper use of PPE and conducting fire drills to ensure employees are prepared for emergencies.' },
  { id: 52, category: 'Social', text: 'Do you conduct Mock drills at place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Periodic mock drills to demonstrate readiness for emergency evacuation and response in case of fire or other hazards.' },
  { id: 53, category: 'Social', text: 'Do you carry out annual employee satisfaction survey?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Conducting a yearly survey to gauge employee satisfaction and gather insights on improving workplace conditions.' },
  { id: 54, category: 'Social', text: 'Do you communicate fair and true results of employee satisfaction survey into company?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Sharing transparent and accurate results from the satisfaction survey with employees to foster trust and involvement in decision-making.' },
  { id: 55, category: 'Social', text: 'Do you have a first aid kit in place?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Ensuring the availability of first aid kits at the workplace for immediate medical attention in case of injury.' },
  { id: 56, category: 'Social', text: 'Are you certified for ISO 45001-2018?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certification for Occupational Health and Safety Management System (OHSMS) under the ISO 45001:2018 standard to ensure a safe working environment.' },
  { id: 57, category: 'Social', text: 'Do you provide training to employees on internal audit techniques for OHS?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Training employees on conducting internal audits to ensure compliance with Occupational Health and Safety (OHS) practices.' },
  { id: 58, category: 'Social', text: 'Are you certified for any other social standards like SA 8000, SEDEX, ETI, BSCI etc.?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certification for social accountability standards, such as SA 8000, SEDEX, Ethical Trading Initiative (ETI), or Business Social Compliance Initiative (BSCI), ensuring responsible business practices.' },
  { id: 59, category: 'Social', text: 'Have you been audited by any independent third party for labour laws practices?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'External audits conducted by third-party organizations to assess compliance with labor laws and fair employment practices.' },
  { id: 60, category: 'Social', text: 'Do you engage stakeholders for awareness & implementation of health and safety practices?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Engaging suppliers, vendors, contractors, and regulatory authorities to promote health and safety awareness and practices across the supply chain.' },
  { id: 61, category: 'Governance', text: 'Do you have a legal licence / registration of company as per local regulations?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A valid company registration and licensing under local laws to operate legally within the designated jurisdiction.' },
  { id: 62, category: 'Governance', text: 'Do you have a consent to establish from State Pollution Control Board?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Formal approval granted by the State Pollution Control Board (SPCB) to set up an industrial operation after assessing environmental impacts.' },
  { id: 63, category: 'Governance', text: 'Do you have a consent to operate from State Pollution Control Board?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "A permit from the State Pollution Control Board (SPCB) confirming that the company's operations comply with environmental regulations and standards." },
  { id: 64, category: 'Governance', text: 'Do you have a legal labour license?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A license granted under local labor laws that authorizes the company to employ workers for its operations.' },
  { id: 65, category: 'Governance', text: 'Do you have a legal agreement with labor contractor?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A formal agreement outlining terms of employment, duties, and legal responsibilities between the company and labor contractors.' },
  { id: 66, category: 'Governance', text: 'Do you have a Fire NOC?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: "A No-Objection Certificate (NOC) from the local fire department confirming the company's compliance with fire safety regulations." },
  { id: 67, category: 'Governance', text: 'Do you have a Lift License?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A valid license confirming that the lifts in the facility have been inspected and approved for safe operation as per relevant safety regulations.' },
  { id: 68, category: 'Governance', text: 'Do you have a Compressor Test Certificate from Competent Person under DISH?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A certificate confirming that the compressors used in the facility have been tested by a certified competent person under the Directorate of Industrial Safety and Health (DISH).' },
  { id: 69, category: 'Governance', text: 'Do you have test certificates for Lifting equipment like (cranes, hydra, Lifting belts etc) from a competent person under DISH?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Certification confirming that lifting equipment has passed safety inspections by a qualified professional under DISH guidelines.' },
  { id: 70, category: 'Governance', text: 'Do you provide training to employees on legal requirements?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Regular training sessions on understanding and complying with relevant legal regulations and industry standards.' },
  { id: 71, category: 'Governance', text: 'Do you have Supplier code of conduct in place for suppliers?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'A formal document outlining ethical and legal expectations from suppliers regarding practices such as labor rights, environmental impact, and business conduct.' },
  { id: 72, category: 'Governance', text: 'Do you evaluate your suppliers frequently based on environmental, health and safety related issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Regular evaluations and audits of suppliers to ensure compliance with environmental, health, and safety regulations.' },
  { id: 73, category: 'Governance', text: 'Have you been audited by an independent third party on Governance related issues?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Audits conducted by external, independent parties to evaluate corporate governance practices, ensuring transparency, fairness, and legal compliance.' },
  { id: 74, category: 'Governance', text: 'Do you have documented SOP for accident investigation and reporting?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Standard Operating Procedures (SOPs) for investigating and reporting workplace accidents, ensuring consistency and compliance with safety regulations.' },
  { id: 75, category: 'Governance', text: 'Have you trained your employees on emergency preparedness and evacuation plan?', selectedPoints: 2, notSelectedPoints: -1, naPoints: 0, maybePoints: 0.5, description: 'Regular training programs to prepare employees for emergencies, including fire drills, natural disasters, and other potential workplace incidents.' }
];

const API_BASE_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5001';

// Function to calculate score from answers (same logic as Assessment.jsx)
const calculateScoreFromAnswers = (answers) => {
  let totalScore = 0;
  let maxScore = 0;
  const byCategory = {
    Environment: { score: 0, maxScore: 0, percentage: 0 },
    Social: { score: 0, maxScore: 0, percentage: 0 },
    Governance: { score: 0, maxScore: 0, percentage: 0 },
  };

  questions.forEach((question) => {
    const answer = answers.find((a) => a.questionId === question.id);   
    const category = question.category;
    maxScore += question.selectedPoints;
    byCategory[category].maxScore += question.selectedPoints;

    if (answer) {
      let points = 0;
      switch (answer.answer) {
        case 'yes':
          points = question.selectedPoints;
          break;
        case 'no':
          points = question.notSelectedPoints; // Should be -1, not 2!
          break;
        case 'na':
          points = question.naPoints;
          maxScore -= question.selectedPoints;
          byCategory[category].maxScore -= question.selectedPoints;
          break;
        case 'maybe':
          points = question.maybePoints;
          break;
        default:
          points = 0; // Unknown answer = 0 points
          break;
      }
      totalScore += points;
      byCategory[category].score += points;
    }
  });

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  Object.keys(byCategory).forEach((key) => {
    const cat = byCategory[key];
    cat.percentage = cat.maxScore > 0 ? (cat.score / cat.maxScore) * 100 : 0;
  });

  return { totalScore, maxScore, percentage, byCategory };
};

// Function to calculate grade from score
const calculateGrade = (totalScore, maxScore) => {
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 30) return 'D';
  return 'F';
};

// Function to calculate level from score
const calculateLevel = (totalScore) => {
  if (totalScore >= 136) return 'Expert';
  if (totalScore >= 121) return 'Advanced';
  if (totalScore >= 91) return 'Proficient';
  if (totalScore >= 61) return 'Intermediate';
  if (totalScore >= 31) return 'Beginner';
  return 'Novice';
};

// Function to calculate points for an answer
const calculatePointsForAnswer = (question, answerObj) => {
  if (!answerObj) return 0;
  const answerValue = answerObj.answer || answerObj.value || answerObj.response;
  if (!answerValue) return 0;
  
  switch (answerValue) {
    case 'yes':
      return question.selectedPoints;
    case 'no':
      return question.notSelectedPoints;
    case 'na':
      return question.naPoints;
    case 'maybe':
      return question.maybePoints;
    default:
      return 0;
  }
};

// Function to transform answers into questionDetails
const transformAnswersToQuestionDetails = (answers) => {
  if (!answers || !Array.isArray(answers)) {
    console.log('transformAnswersToQuestionDetails: Invalid answers input', answers);
    return [];
  }
  
  console.log('transformAnswersToQuestionDetails: Processing', answers.length, 'answers');
  console.log('Sample answer structure:', answers[0]);
  
  return answers
    .map((answer, idx) => {
      // Handle different answer formats
      const questionId = answer.questionId || answer.id || answer.question_id;
      const answerValue = answer.answer || answer.value || answer.response;
      
      if (!questionId) {
        console.warn(`Answer at index ${idx} missing questionId:`, answer);
        return null;
      }
      
      const question = questions.find(q => q.id === questionId);
      if (!question) {
        console.warn(`Question not found for questionId ${questionId}`);
        return null;
      }
      
      const points = calculatePointsForAnswer(question, { answer: answerValue });
      
      return {
        question: question.text,
        answer: answerValue,
        points: points,
        category: question.category,
        description: question.description
      };
    })
    .filter(detail => detail !== null)
    .sort((a, b) => {
      // Sort by category order, then by question ID
      const categoryOrder = ['Environment', 'Social', 'Governance'];
      const categoryDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      if (categoryDiff !== 0) return categoryDiff;
      return questions.findIndex(q => q.text === a.question) - questions.findIndex(q => q.text === b.question);
    });
};

// --- MOCK TYPES ---
// Added minimal types to make the component self-contained
// Types removed - using plain JavaScript
// --- END MOCK TYPES ---

// +++ Add a default user object to prevent crash if user prop is undefined +++
const defaultUser = {
  id: '001',
  organization: 'Default Company',
  company: 'Default Company',
  industry: 'General',
  location: 'Not Specified',
  name: 'Demo User',
};

// DashboardProps interface removed - using plain JavaScript

const SCORE_LEVELS = [
  { name: 'Expert', range: '136 - 150', min: 136, max: 150, description: 'Exceptional Understanding and performance.', color: 'bg-emerald-500', textColor: 'text-emerald-700' },
  { name: 'Advanced', range: '121 - 135', min: 121, max: 135, description: 'Strong skills and deep understanding.', color: 'bg-green-500', textColor: 'text-green-700' },
  { name: 'Proficient', range: '91 - 120', min: 91, max: 120, description: 'Good Competency. Can achieve further levels by proper trainings.', color: 'bg-blue-500', textColor: 'text-blue-700' },
  { name: 'Intermediate', range: '61 - 90', min: 61, max: 90, description: 'Solid grasp of basics. Can improve in ESG with training and other support.', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { name: 'Beginner', range: '31 - 60', min: 31, max: 60, description: 'Gaining familiarity, but still learning core concepts and needs further training.', color: 'bg-orange-500', textColor: 'text-orange-700' },
  { name: 'Novice', range: '0 - 30', min: 0, max: 30, description: 'Just starting out. Needs foundational understanding, guidance and training.', color: 'bg-red-500', textColor: 'text-red-700' },
];

// FIX: Changed mockScoreData to have the same nested structure 
// as the object created when 'score' prop is present.
const mockScoreData = {
  environmental: {
    score: 45,
    maxScore: 70,
    percentage: 64.3
  },
  social: {
    score: 32,
    maxScore: 50,
    percentage: 64.0
  },
  governance: {
    score: 18,
    maxScore: 30,
    percentage: 60.0
  },
  total: {
    score: 95,
    maxScore: 150,
    percentage: 63.3
  }
};


// Removed unused mock data: mockUserInfo, environmentalData, socialData, governanceData

// Payment gateway integration removed - will be added by someone else


// +++ Dashboard Report Component +++
// This component contains the original dashboard UI
const DashboardReport = ({
  user = defaultUser, // Use defaultUser if prop is undefined
  score,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    captcha: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');
  
  // If score is not provided, show loading or error
  if (!score) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Assessment Data</h2>
          <p className="text-gray-600 mb-4">Please complete an assessment to view your dashboard.</p>
        <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
            Start Assessment
        </button>
      </div>
    </div>
  );
  }
  
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError('');
    setContactSuccess(false);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          mobile: contactForm.mobile || null,
          message: contactForm.message,
          captcha_code: contactForm.captcha
        }),
      });
      
      if (response.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', mobile: '', message: '', captcha: '' });
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        const data = await response.json();
        setContactError(data.error || 'Failed to submit contact form');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactError('Failed to submit contact form. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  // Use real score data if available, otherwise fall back to mock data
  const scoreData = score ? {
    environmental: {
      score: score.environment || 0,
      maxScore: score.categoryBreakdown?.Environment?.maxScore || score.categoryBreakdown?.environment?.maxScore || 70,
      percentage: score.categoryBreakdown?.Environment?.accuracy || score.categoryBreakdown?.environment?.accuracy || 0
    },
    social: {
      score: score.social || 0,
      maxScore: score.categoryBreakdown?.Social?.maxScore || score.categoryBreakdown?.social?.maxScore || 50,
      percentage: score.categoryBreakdown?.Social?.accuracy || score.categoryBreakdown?.social?.accuracy || 0
    },
    governance: {
      score: score.governance || 0,
      maxScore: score.categoryBreakdown?.Governance?.maxScore || score.categoryBreakdown?.governance?.maxScore || 30,
      percentage: score.categoryBreakdown?.Governance?.accuracy || score.categoryBreakdown?.governance?.accuracy || 0
    },
    total: {
      score: score.total || 0,
      maxScore: score.maxScore || 150,
      percentage: score.accuracy || 0
    }
  } : mockScoreData;

  const currentLevel = SCORE_LEVELS.find(level =>
    scoreData.total.score >= level.min && scoreData.total.score <= level.max
  ) || SCORE_LEVELS[SCORE_LEVELS.length - 1];

  const pages = [
    'Cover Page',
    'Executive Summary',
    'Environmental Assessment',
    'Social Assessment',
    'Governance Assessment',
    'Question Details',
    'Comparative Analysis',
    'Recommendations',

  ];

  const renderProgressBar = (score, maxScore, color = 'bg-blue-500') => {
    const percentage = Math.max(0, (score / maxScore) * 100);
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  const renderCoverPage = () => (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 text-gray-800 min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img
          src="/SF-logo.png"
          alt="SF Logo Background"
          className="w-96 h-96 object-contain"
          onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400/eeeeee/aaaaaa?text=SF+Logo")}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 relative z-10">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-6 mb-6 inline-block shadow-lg">
            <Award className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">ESG Assessment</h1>
          <h2 className="text-2xl sm:text-3xl font-light mb-2 text-gray-700">Report Card</h2>
          <p className="text-lg sm:text-xl text-gray-600">Environmental, Social & Governance Evaluation</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-lg border border-green-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="text-gray-600 mb-1 font-medium">Company Name</p>
              <p className="font-semibold text-gray-800">{user.organization || user.company || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1 font-medium">Report Number</p>
              <p className="font-semibold text-gray-800">ESG-{new Date().getFullYear()}-{String(user.id).padStart(3, '0')}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1 font-medium">Assessment Date</p>
              <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1 font-medium">Industry</p>
              <p className="font-semibold text-gray-800">{user.industry || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1 font-medium">Location</p>
              <p className="font-semibold text-gray-800">{user.location || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1 font-medium">Assessor</p>
              <p className="font-semibold text-gray-800">{user.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-6 border-t border-green-200">
        <p className="text-gray-600">Generated by ESG Assessment Platform</p>
      </div>
    </div>
  );

  const renderExecutiveSummary = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-green-600 pb-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Executive Summary</h1>
              <p className="text-gray-600">{user.organization || user.company || 'N/A'}</p>
            </div>
            <div className="text-left sm:text-right text-sm text-gray-500 mt-2 sm:mt-0">
              <p>Report: ESG-{new Date().getFullYear()}-{String(user.id).padStart(3, '0')}</p>
              <p>Date: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 sm:p-8 mb-8 shadow-lg border border-green-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall ESG Performance</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-2">{scoreData.total.score}</div>
                <div className="text-gray-500">out of {scoreData.total.maxScore}</div>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-white font-bold text-lg ${currentLevel.color}`}>
                  <Star className="w-6 h-6" />
                  <span>{currentLevel.name}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">{currentLevel.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-green-800">Environmental</h3>
                <p className="text-green-600">35 Questions</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">{scoreData.environmental.score}</span>
                <span className="text-green-500">/ {scoreData.environmental.maxScore}</span>
              </div>
              {renderProgressBar(scoreData.environmental.score, scoreData.environmental.maxScore, 'bg-green-500')}
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-green-600">{scoreData.environmental.percentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-xl font-bold text-blue-800">Social</h3>
                <p className="text-blue-600">25 Questions</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-blue-600">{scoreData.social.score}</span>
                <span className="text-blue-500">/ {scoreData.social.maxScore}</span>
              </div>
              {renderProgressBar(scoreData.social.score, scoreData.social.maxScore, 'bg-blue-500')}
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-blue-600">{scoreData.social.percentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold text-purple-800">Governance</h3>
                <p className="text-purple-600">15 Questions</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-purple-600">{scoreData.governance.score}</span>
                <span className="text-purple-500">/ {scoreData.governance.maxScore}</span>
              </div>
              {renderProgressBar(scoreData.governance.score, scoreData.governance.maxScore, 'bg-purple-500')}
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-purple-600">{scoreData.governance.percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Performance Levels */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ESG Competency Levels</h3>
          <div className="space-y-3">
            {SCORE_LEVELS.map((level) => (
              <div
                key={level.name}
                className={`flex items-start sm:items-center space-x-4 p-4 rounded-lg border-2 ${currentLevel.name === level.name
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200'
                  }`}
              >
                <div className={`w-4 h-4 rounded-full ${level.color} mt-1 sm:mt-0 flex-shrink-0`}></div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                    <span className="font-bold text-gray-800">{level.name}</span>
                    <span className="text-sm text-gray-500">({level.range})</span>
                    {currentLevel.name === level.name && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium self-start sm:self-center mt-1 sm:mt-0">
                        Current Level
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnvironmentalAssessment = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-green-600 pb-4 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Environmental Assessment</h1>
          </div>
          <p className="text-gray-600">Environmental sustainability performance analysis</p>
        </div>

        {/* Score Overview */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Environmental Performance</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-2">{scoreData.environmental.score}</div>
                <div className="text-gray-500">out of {scoreData.environmental.maxScore}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">{scoreData.environmental.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Performance</div>
              </div>
            </div>
          </div>
          {renderProgressBar(scoreData.environmental.score, scoreData.environmental.maxScore, 'bg-green-500')}
        </div>

        {/* Environmental Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Energy Management</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Energy Efficiency</span>
                <span className="font-semibold text-green-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Renewable Energy</span>
                <span className="font-semibold text-green-600">72%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carbon Footprint</span>
                <span className="font-semibold text-green-600">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Resource Conservation</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Water Management</span>
                <span className="font-semibold text-green-600">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waste Reduction</span>
                <span className="font-semibold text-green-600">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sustainable Materials</span>
                <span className="font-semibold text-green-600">82%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Environmental Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800">Implement Energy Efficiency Programs</p>
                <p className="text-blue-600 text-sm">Focus on reducing energy consumption through better practices and technology upgrades.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800">Adopt Renewable Energy Sources</p>
                <p className="text-blue-600 text-sm">Consider solar, wind, or other renewable energy options for your operations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800">Enhance Waste Management</p>
                <p className="text-blue-600 text-sm">Implement comprehensive recycling and waste reduction programs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialAssessment = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-blue-600 pb-4 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Social Assessment</h1>
          </div>
          <p className="text-gray-600">Social responsibility and stakeholder engagement analysis</p>
        </div>

        {/* Score Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Performance</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-5xl sm:text-6xl font-bold text-blue-600 mb-2">{scoreData.social.score}</div>
                <div className="text-gray-500">out of {scoreData.social.maxScore}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">{scoreData.social.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Performance</div>
              </div>
            </div>
          </div>
          {renderProgressBar(scoreData.social.score, scoreData.social.maxScore, 'bg-blue-500')}
        </div>

        {/* Social Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Employee Welfare</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Health & Safety</span>
                <span className="font-semibold text-blue-600">82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training & Development</span>
                <span className="font-semibold text-blue-600">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work-Life Balance</span>
                <span className="font-semibold text-blue-600">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Community Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Diversity & Inclusion</span>
                <span className="font-semibold text-blue-600">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Local Engagement</span>
                <span className="font-semibold text-blue-600">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stakeholder Relations</span>
                <span className="font-semibold text-blue-600">72%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">Social Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">Enhance Employee Training Programs</p>
                <p className="text-green-600 text-sm">Invest in comprehensive training and development initiatives for all employees.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">Strengthen Diversity Initiatives</p>
                <p className="text-green-600 text-sm">Implement policies and programs to promote diversity and inclusion in the workplace.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">Improve Community Engagement</p>
                <p className="text-green-600 text-sm">Develop stronger relationships with local communities and stakeholders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGovernanceAssessment = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-purple-600 pb-4 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Governance Assessment</h1>
          </div>
          <p className="text-gray-600">Corporate governance and ethical business practices analysis</p>
        </div>

        {/* Score Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Governance Performance</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-5xl sm:text-6xl font-bold text-purple-600 mb-2">{scoreData.governance.score}</div>
                <div className="text-gray-500">out of {scoreData.governance.maxScore}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600">{scoreData.governance.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Performance</div>
              </div>
            </div>
          </div>
          {renderProgressBar(scoreData.governance.score, scoreData.governance.maxScore, 'bg-purple-500')}
        </div>

        {/* Governance Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Board & Leadership</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Board Independence</span>
                <span className="font-semibold text-purple-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Executive Compensation</span>
                <span className="font-semibold text-purple-600">72%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Management</span>
                <span className="font-semibold text-purple-600">78%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Compliance & Ethics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Regulatory Compliance</span>
                <span className="font-semibold text-purple-600">88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ethical Standards</span>
                <span className="font-semibold text-purple-600">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transparency</span>
                <span className="font-semibold text-purple-600">82%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-800 mb-4">Governance Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-800">Strengthen Board Independence</p>
                <p className="text-orange-600 text-sm">Ensure board composition includes independent directors with diverse expertise.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-800">Enhance Risk Management</p>
                <p className="text-orange-600 text-sm">Implement comprehensive risk assessment and management frameworks.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-800">Improve Transparency</p>
                <p className="text-orange-600 text-sm">Increase disclosure and transparency in corporate reporting and decision-making.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionDetails = () => {
    console.log('renderQuestionDetails called');
    console.log('score:', score);
    console.log('score.questionDetails:', score?.questionDetails);
    console.log('questionDetails length:', score?.questionDetails?.length || 0);
    
    return (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-blue-600 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Question Details</h1>
          <p className="text-gray-600">Detailed breakdown of your responses</p>
        </div>

        {score && score.questionDetails && score.questionDetails.length > 0 ? (
          <div className="space-y-6">
            {score.questionDetails.map((detail, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-500 mr-2">Category:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        detail.category === 'Environment' ? 'bg-green-100 text-green-800' :
                        detail.category === 'Social' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {detail.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Question {index + 1}
                    </h3>
                    <p className="text-gray-600 mb-3">{detail.question}</p>
                    {detail.description && (
                      <p className="text-sm text-gray-500 mb-3 italic">{detail.description}</p>
                    )}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-500">Your Answer:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        detail.answer === 'yes' ? 'bg-green-100 text-green-800' :
                        detail.answer === 'no' ? 'bg-red-100 text-red-800' :
                        detail.answer === 'na' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {detail.answer === 'yes' ? 'Yes' :
                          detail.answer === 'no' ? 'No' :
                            detail.answer === 'na' ? 'Not Applicable' :
                            detail.answer === 'maybe' ? 'Maybe' : detail.answer}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className={`text-2xl font-bold ${
                      detail.points > 0 ? 'text-green-600' :
                      detail.points < 0 ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {detail.points > 0 ? '+' : ''}{detail.points}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Question Details Available</h3>
            <p className="text-gray-500 mb-4">Question details will appear here after completing an assessment.</p>
            {score && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Debug Info:</p>
                <p className="text-xs text-gray-500">Score exists: {score ? 'Yes' : 'No'}</p>
                <p className="text-xs text-gray-500">QuestionDetails exists: {score?.questionDetails ? 'Yes' : 'No'}</p>
                <p className="text-xs text-gray-500">QuestionDetails length: {score?.questionDetails?.length || 0}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderComparativeAnalysis = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-green-600 pb-4 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Comparative Analysis</h1>
          </div>
          <p className="text-gray-600">Performance comparison with industry benchmarks and peers</p>
        </div>

        {/* Overall Performance Comparison */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 sm:p-8 mb-8 shadow-lg border border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Performance vs Industry Average</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Environmental Comparison */}
            <div className="bg-white rounded-lg p-6 border border-indigo-200">
              <div className="flex items-center space-x-3 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">Environmental</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Score</span>
                  <span className="font-bold text-green-600">{scoreData.environmental.score}/{scoreData.environmental.maxScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Industry Avg</span>
                  <span className="font-semibold text-gray-600">18/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${scoreData.environmental.percentage}%` }}></div>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-medium ${scoreData.environmental.percentage > 72 ? 'text-green-600' :
                    scoreData.environmental.percentage > 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {scoreData.environmental.percentage > 72 ? 'Above Average' :
                      scoreData.environmental.percentage > 60 ? 'Average' : 'Below Average'}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Comparison */}
            <div className="bg-white rounded-lg p-6 border border-indigo-200">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">Social</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Score</span>
                  <span className="font-bold text-blue-600">{scoreData.social.score}/{scoreData.social.maxScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Industry Avg</span>
                  <span className="font-semibold text-gray-600">16/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${scoreData.social.percentage}%` }}></div>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-medium ${scoreData.social.percentage > 64 ? 'text-green-600' :
                    scoreData.social.percentage > 52 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {scoreData.social.percentage > 64 ? 'Above Average' :
                      scoreData.social.percentage > 52 ? 'Average' : 'Below Average'}
                  </span>
                </div>
              </div>
            </div>

            {/* Governance Comparison */}
            <div className="bg-white rounded-lg p-6 border border-indigo-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-800">Governance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Score</span>
                  <span className="font-bold text-purple-600">{scoreData.governance.score}/{scoreData.governance.maxScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Industry Avg</span>
                  <span className="font-semibold text-gray-600">14/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${scoreData.governance.percentage}%` }}></div>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-medium ${scoreData.governance.percentage > 56 ? 'text-green-600' :
                    scoreData.governance.percentage > 44 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {scoreData.governance.percentage > 56 ? 'Above Average' :
                      scoreData.governance.percentage > 44 ? 'Average' : 'Below Average'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Ranking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Ranking</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="font-semibold text-gray-800">Top Performers</span>
                </div>
                <span className="text-blue-600 font-bold">85-100%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="font-semibold text-gray-800">Above Average</span>
                </div>
                <span className="text-green-600 font-bold">70-84%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="font-semibold text-gray-800">Average</span>
                </div>
                <span className="text-yellow-600 font-bold">55-69%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span className="font-semibold text-gray-800">Below Average</span>
                </div>
                <span className="text-red-600 font-bold">Below 55%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Position</h3>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {scoreData.total.percentage > 80 ? 'Top 10%' :
                  scoreData.total.percentage > 70 ? 'Top 25%' :
                    scoreData.total.percentage > 60 ? 'Top 50%' :
                      scoreData.total.percentage > 50 ? 'Top 75%' : 'Top 90%'}
              </div>
              <p className="text-gray-600 mb-4">of companies in your industry</p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Your Score</span>
                  <span className="font-bold text-green-600">{scoreData.total.score}/{scoreData.total.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${scoreData.total.percentage}%` }}></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium text-green-600">{scoreData.total.percentage.toFixed(1)}% Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Benchmark */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Industry Benchmark Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{scoreData.environmental.percentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Environmental</div>
              <div className="text-xs text-gray-500 mt-1">vs 72% Industry Avg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{scoreData.social.percentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Social</div>
              <div className="text-xs text-gray-500 mt-1">vs 64% Industry Avg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{scoreData.governance.percentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Governance</div>
              <div className="text-xs text-gray-500 mt-1">vs 56% Industry Avg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-b-2 border-green-600 pb-4 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Recommendations</h1>
          </div>
          <p className="text-gray-600">Strategic recommendations for improving your ESG performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Environmental Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Environmental Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-800">Implement Energy Efficiency Programs</p>
                  <p className="text-blue-600 text-sm">Focus on reducing energy consumption through better practices and technology upgrades.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-800">Adopt Renewable Energy Sources</p>
                  <p className="text-blue-600 text-sm">Consider solar, wind, or other renewable energy options for your operations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-800">Enhance Waste Management</p>
                  <p className="text-blue-600 text-sm">Implement comprehensive recycling and waste reduction programs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Recommendations */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Social Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Enhance Employee Training</p>
                  <p className="text-green-600 text-sm">Invest in comprehensive training programs for skill development and career growth.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Improve Diversity & Inclusion</p>
                  <p className="text-green-600 text-sm">Develop policies and practices that promote workplace diversity and inclusion.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Community Engagement</p>
                  <p className="text-green-600 text-sm">Strengthen relationships with local communities and stakeholders.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Governance Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-orange-800 mb-4">Governance Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800">Strengthen Risk Management</p>
                  <p className="text-orange-600 text-sm">Implement comprehensive risk assessment and mitigation strategies.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800">Enhance Transparency</p>
                  <p className="text-orange-600 text-sm">Improve reporting and disclosure practices for better stakeholder communication.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800">Board Oversight</p>
                  <p className="text-orange-600 text-sm">Strengthen board governance and oversight mechanisms.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Recommendations */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Training & Development</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-purple-800">ESG Certification Programs</p>
                  <p className="text-purple-600 text-sm">Enroll in professional ESG training and certification courses.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-purple-800">Industry Best Practices</p>
                  <p className="text-purple-600 text-sm">Learn from industry leaders and implement proven strategies.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-purple-800">Continuous Learning</p>
                  <p className="text-purple-600 text-sm">Stay updated with the latest ESG trends and regulations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SF Training Courses Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-4 mb-4 inline-block">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">SF Training Courses</h2>
            <p className="text-lg text-gray-600 mb-2">Empowering Professionals for a Sustainable Tomorrow</p>
            <p className="text-gray-500">Practical, Accredited, and AI-Enhanced Sustainability Training</p>
          </div>

          {/* Featured Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* ESG & Sustainability */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800">ESG & Sustainability</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Fundamentals of ESG</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3 Hours</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Carbon Footprint & GHG</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3-8 Hours</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">BRSR Implementation</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Management */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800">Quality Management</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 9001 Lead Auditor</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Live-Online</span>
                    <span>5 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 9001 Implementor</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 9001 Awareness</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>1 Day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Safety */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-800">Food Safety</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 22000:2018</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>1-5 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Lead Auditor</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>5 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment & Safety */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-800">Environment & Safety</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 14001 Environmental</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>1-5 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 45001 OH&S</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>1-5 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Security */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800">Information Security</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 27001</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>2-5 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Implementation</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Devices */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-teal-600" />
                </div>
                <h4 className="font-bold text-gray-800">Medical Devices</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">ISO 13485</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>1-5 Days</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm">Quality Management</h5>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Online</span>
                    <span>3 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Career?</h3>
            <p className="text-lg mb-4 opacity-90">
              Join thousands of professionals who have enhanced their skills with SF Training courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.sftrainings.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Visit SF Trainings Website
              </a>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Contact SF Trainings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">India</h4>
              <p className="text-xs text-gray-600">Mohali, Punjab</p>
              <p className="text-xs text-blue-600 font-semibold">+91 9056742782</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Canada</h4>
              <p className="text-xs text-gray-600">Delta, BC</p>
              <p className="text-xs text-green-600 font-semibold">+1 (778) 798-9624</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Dubai</h4>
              <p className="text-xs text-gray-600">Business Bay</p>
              <p className="text-xs text-purple-600 font-semibold">UAE</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">UK</h4>
              <p className="text-xs text-gray-600">London</p>
              <p className="text-xs text-orange-600 font-semibold">N1 7GU</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0: return renderCoverPage();
      case 1: return renderExecutiveSummary();
      case 2: return renderEnvironmentalAssessment();
      case 3: return renderSocialAssessment();
      case 4: return renderGovernanceAssessment();
      case 5: return renderQuestionDetails();
      case 6: return renderComparativeAnalysis();
      case 7: return renderRecommendations();
      default: return renderCoverPage();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-green-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Logo Section */}
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-4 mb-3 lg:mb-0 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-xl p-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-500">
                    <img
                      src="/SF-logo.png"
                      alt="SF Logo"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/80x80/ffffff/333333?text=SF")}
                    />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">Sustainability Futures</h3>
                  <p className="text-sm text-gray-600">ESG Assessment Report</p>
                </div>
              </button>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-4">
                <div className="text-sm text-gray-600">
                  Page {currentPage + 1} of {pages.length}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                  disabled={currentPage === pages.length - 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                  </div>
                  </div>

            {/* Page Navigation */}
            <div className="flex space-x-1 mt-3 overflow-x-auto pb-2">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${currentPage === index
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        {/* Responsive padding-top to avoid header overlap */}
        <div className="transition-all duration-300 pt-[260px] lg:pt-[140px]" data-page-content>
          {renderCurrentPage()}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-green-950 text-gray-300 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6 md:col-span-1">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/SF-logo.png" alt="Sustainable Futures logo" className="w-12 h-12 object-contain" />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-300 transition-colors">
                  Sustainable <span className="block font-normal">Futures</span>
                </h4>
              </button>
              <p className="text-gray-400">
                At Sustainable Futures, our story began with a passion for creating a more sustainable future for our planet.
              </p>
              <div className="flex gap-4">
                <a href="mailto:info@sustainablefuturespcs.org?subject=Contact%20from%20Website&body=Hello,%20I%20would%20like%20to%20get%20in%20touch..." aria-label="Email Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </a>
                <a href="tel:+919722001132" aria-label="Call Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-.184-5.253-2.6-5.438-5.438l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" /></svg>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Plot+146,+JLPL+Industrial+Area,+Sector+82,+Mohali,+Punjab+140306,+India" target="_blank" rel="noopener noreferrer" aria-label="View Location" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                </a>
              </div>
            </div>

            <div className="space-y-6 md:col-span-1">
              <h4 className="text-xl md:text-2xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3 text-base md:text-lg">
                {[
                  { label: 'Privacy Policy', url: 'https://sustainablefuturespcs.org/privacy-policy/' },
                  { label: 'Terms and Conditions', url: 'https://sustainablefuturespcs.org/terms-and-conditions/' },
                  { label: 'Refund Policy', url: 'https://sustainablefuturespcs.org/refund-policy/' },
                  { label: 'My Account', url: 'https://sustainablefuturespcs.org/my-account-2/' },
                  { label: 'Registration', url: 'https://sustainablefuturespcs.org/registration/' }
                ].map(item => (
                  <li key={item.label}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-300 transition-all duration-300 hover:translate-x-1">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:col-span-1">
              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-semibold text-white">Contact Us</h4>
                <a href="mailto:info@sustainablefuturespcs.org" className="flex items-center gap-3 text-base md:text-lg hover:text-green-300 transition-colors">
                  <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                  <span className="break-all">info@sustainablefuturespcs.org</span>
                </a>
              </div>
              <div className="space-y-4 pt-4">
                <h4 className="text-xl md:text-2xl font-semibold text-white">Location</h4>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Plot+146,+JLPL+Industrial+Area,+Sector+82,+Mohali,+Punjab+140306,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-base md:text-lg hover:text-green-300 transition-colors cursor-pointer group"
                >
                  <svg className="w-6 h-6 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                  <span className="group-hover:underline">
                    Plot 146, JLPL Industrial Area<br />
                    Sector 82, Mohali (PB)<br />
                    India 140306
                  </span>
                </a>
              </div>
            </div>

            <div className="space-y-6 md:col-span-2 xl:col-span-1">
              <h4 className="text-xl md:text-2xl font-semibold text-white">Get in touch</h4>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {contactSuccess && (
                  <div className="p-4 rounded-lg bg-green-600 text-white text-sm">
                    Thank you! Your message has been sent successfully.
          </div>
                )}
                {contactError && (
                  <div className="p-4 rounded-lg bg-red-600 text-white text-sm">
                    {contactError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    required 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" 
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    required 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" 
                  />
                </div>
                <input 
                  type="text" 
                  name="mobile"
                  placeholder="Mobile" 
                  value={contactForm.mobile}
                  onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                  className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" 
                />
                <textarea 
                  name="message"
                  placeholder="Message" 
                  rows={4} 
                  required 
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-200 text-gray-900 border border-gray-300 flex items-center justify-center font-mono font-bold text-xl tracking-widest">
                    D8Y04I
                  </div>
                  <input 
                    type="text" 
                    name="captcha"
                    placeholder="Enter Captcha" 
                    required 
                    value={contactForm.captcha}
                    onChange={(e) => setContactForm({ ...contactForm, captcha: e.target.value })}
                    className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={contactLoading}
                  className="w-full py-4 px-6 rounded-lg bg-green-500 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-green-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 Sustainable Futures. All rights reserved.</p>
              <p>Building a sustainable future, one assessment at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// Removed unused mock data: mockUserInfo, environmentalData, socialData, governanceData

// +++ Main Dashboard Component +++

const buildCategoryBreakdown = (source = {}) => {
  const environment = source.Environment || source.environment || {};
  const social = source.Social || source.social || {};
  const governance = source.Governance || source.governance || {};

  const breakdown = {
    Environment: {
      score: environment.score || 0,
      maxScore: environment.maxScore || 70,
      accuracy: environment.percentage || environment.accuracy || 0,
    },
    Social: {
      score: social.score || 0,
      maxScore: social.maxScore || 50,
      accuracy: social.percentage || social.accuracy || 0,
    },
    Governance: {
      score: governance.score || 0,
      maxScore: governance.maxScore || 30,
      accuracy: governance.percentage || governance.accuracy || 0,
    },
  };

  return {
    ...breakdown,
    environment: breakdown.Environment,
    social: breakdown.Social,
    governance: breakdown.Governance,
  };
};

const normaliseScore = (rawScore) => {
  if (!rawScore) return null;

  // Already has total -> ensure breakdown aliases and return clone
  if (rawScore.categoryBreakdown && rawScore.total !== undefined) {
    const categoryBreakdown = buildCategoryBreakdown(rawScore.categoryBreakdown);
    return {
      ...rawScore,
      categoryBreakdown,
      questionDetails: rawScore.questionDetails ?? [],
    };
  }

  const total = rawScore.totalScore ?? rawScore.total ?? 0;
  const maxScore = rawScore.maxScore ?? 150;
  const accuracy = rawScore.percentage ?? rawScore.accuracy ?? (maxScore ? (total / maxScore) * 100 : 0);

  const byCategory = rawScore.byCategory || {};

  return {
    total,
    maxScore,
    accuracy,
    environment: rawScore.environment ?? byCategory.Environment?.score ?? 0,
    social: rawScore.social ?? byCategory.Social?.score ?? 0,
    governance: rawScore.governance ?? byCategory.Governance?.score ?? 0,
    esgPlus: rawScore.esgPlus ?? rawScore.esgPlusScore ?? 0,
    grade: rawScore.grade ?? calculateGrade(total, maxScore),
    level: rawScore.level ?? calculateLevel(total),
    questionDetails: rawScore.questionDetails ?? [],
    categoryBreakdown: buildCategoryBreakdown({
      Environment: byCategory.Environment,
      Social: byCategory.Social,
      Governance: byCategory.Governance,
    }),
  };
};

const Dashboard = ({ user: propUser, score: propScore }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const skipAuth = Boolean(location.state?.skipAuth);
  const initialUser = propUser || location.state?.user || (skipAuth ? defaultUser : null);
  const initialScore = normaliseScore(propScore || location.state?.score);
  const [user, setUser] = useState(initialUser);
  const [score, setScore] = useState(initialScore);
  const [loading, setLoading] = useState(!initialScore && !skipAuth);
  
  // Payment gateway integration removed - will be added by someone else

  useEffect(() => {
    if (skipAuth) {
      return;
    }
    // Check token expiration first
    const checkAuth = async () => {
      const isValid = await checkTokenAndRedirect(navigate);
      if (!isValid) {
        return;
      }
    
    // Get user from localStorage if not provided
    if (!user) {
      const storedUser = localStorage.getItem('user') || localStorage.getItem('authUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          clearAuth();
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    }
    };
    
    checkAuth();
  }, [user, navigate, skipAuth]);

  // Periodically check token expiration (every 5 minutes)
  useEffect(() => {
    if (skipAuth) {
      return;
    }
    const checkInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token || isTokenExpired(token)) {
        clearAuth();
        navigate('/login');
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(checkInterval);
  }, [navigate, skipAuth]);

  useEffect(() => {
    if (skipAuth) {
      setLoading(false);
      return;
    }
    // Load assessment data from backend if we don't yet have full question details
    const needsFetch = (!score || !score.questionDetails || score.questionDetails.length === 0);
    if (needsFetch && user?.id) {
      setLoading(true); // Ensure loading is true when starting to load
      const loadAssessment = async () => {
        try {
          console.log('Loading assessment for user:', user.id);
          const response = await authenticatedFetch(`${API_BASE_URL}/api/assessments/user/${user.id}`, {
            method: 'GET'
          }, navigate);
          
          console.log('Assessment response status:', response.status);
          
          if (response.ok) {
            const assessments = await response.json();
            console.log('Assessments received:', assessments?.length || 0);
            
            if (assessments && assessments.length > 0) {
              // Get the most recent assessment
              const latestAssessment = assessments[0];
              
              // Parse answers from backend
              const answers = latestAssessment.answers ? 
                (typeof latestAssessment.answers === 'string' ? JSON.parse(latestAssessment.answers) : latestAssessment.answers) : [];
              
              console.log('Parsed answers:', answers.length);
              
              // Recalculate score from answers to ensure correctness
              // This fixes issues where backend might have incorrect calculations
              const recalculatedScore = calculateScoreFromAnswers(answers);
              
              // Transform answers into questionDetails
              const questionDetails = transformAnswersToQuestionDetails(answers);
              
              console.log('Transformed questionDetails:', questionDetails.length);
              console.log('Sample questionDetail:', questionDetails[0]);
              
              // Use recalculated scores instead of backend scores
              const transformedScore = normaliseScore({
                total: recalculatedScore.totalScore,
                maxScore: recalculatedScore.maxScore,
                accuracy: recalculatedScore.percentage,
                environment: recalculatedScore.byCategory.Environment.score,
                social: recalculatedScore.byCategory.Social.score,
                governance: recalculatedScore.byCategory.Governance.score,
                esgPlus: 0, // Calculate if needed
                grade: calculateGrade(recalculatedScore.totalScore, recalculatedScore.maxScore),
                level: calculateLevel(recalculatedScore.totalScore),
                questionDetails: questionDetails,
                categoryBreakdown: recalculatedScore.byCategory && buildCategoryBreakdown(recalculatedScore.byCategory),
              });
              
              console.log('Setting score:', transformedScore);
              setScore(transformedScore);
              setLoading(false);
            } else {
              // User hasn't completed assessment, redirect to assessment
              console.log('No assessments found, redirecting to assessment');
              navigate('/assessment');
              return;
            }
          } else {
            // If response is not ok, redirect to assessment
            console.log('Response not OK, redirecting to assessment');
            navigate('/assessment');
            return;
          }
        } catch (error) {
          console.error('Error loading assessment:', error);
          // If error occurs, redirect to assessment
          navigate('/assessment');
        } finally {
          setLoading(false);
        }
      };
      
      loadAssessment();
    } else if (score) {
      // If score is already provided, stop loading
      console.log('Score already provided, stopping loading');
      setLoading(false);
    } else if (!user?.id) {
      // If no user, stop loading (will redirect to login)
      console.log('No user ID, stopping loading');
      setLoading(false);
    }
  }, [user, navigate, score, skipAuth]);

  // Payment gateway integration removed - will be added by someone else
  // Users can now access dashboard directly after completing assessment

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If no score and user exists, they haven't completed assessment (should redirect)
  // If no user, they should be redirected to login
  if (!score || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardReport
      user={user}
      score={score}
    />
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Sparkles, Home as HomeIcon, Trophy, Zap, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

// Data
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

const orderedCategories = ['Environment', 'Social', 'Governance'];
const orderedQuestions = [...questions].sort((a, b) => orderedCategories.indexOf(a.category) - orderedCategories.indexOf(b.category));

const API_BASE_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5001';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('authUser') || localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    return null;
  }
};

function calculateScore(answers) {
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
          points = question.notSelectedPoints;
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
}

const GameInterface = ({ user, onComplete, onGoHome }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const currentQuestion = orderedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / orderedQuestions.length) * 100;

  const handleAnswer = (answer) => {
    setIsAnswering(true);
    const existingAnswerIndex = answers.findIndex((a) => a.questionId === currentQuestion.id);
    let newAnswers;
    if (existingAnswerIndex > -1) {
      newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = { questionId: currentQuestion.id, answer };
    } else {
      newAnswers = [...answers, { questionId: currentQuestion.id, answer }];
    }
    setAnswers(newAnswers);

    setTimeout(() => {
      setIsAnswering(false);
      if (currentQuestionIndex === orderedQuestions.length - 1) {
        setIsCompleted(true);
        const detailedScore = calculateScore(newAnswers);
        onComplete(newAnswers, detailedScore);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1000);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Governance':
        return 'from-blue-500 to-indigo-600';
      case 'Social':
        return 'from-purple-500 to-pink-600';
      case 'Environment':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Governance':
        return 'bg-blue-50 border-blue-200';
      case 'Social':
        return 'bg-purple-50 border-purple-200';
      case 'Environment':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ba.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Category-specific Video Backgrounds */}
      {!isCompleted && currentQuestion.category === 'Environment' && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-green-900 to-emerald-900">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" onError={(e) => console.error('Environment video error:', e)} onLoadStart={() => setVideoLoaded(false)} onCanPlay={() => setVideoLoaded(true)}>
            <source src="/E.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-white text-sm">Loading background...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!isCompleted && currentQuestion.category === 'Social' && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900 to-pink-900">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" onError={(e) => console.error('Social video error:', e)} onLoadStart={() => setVideoLoaded(false)} onCanPlay={() => setVideoLoaded(true)}>
            <source src="/s.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-white text-sm">Loading background...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!isCompleted && currentQuestion.category === 'Governance' && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900 to-purple-900">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" onError={(e) => console.error('Video error:', e)} onLoadStart={() => setVideoLoaded(false)} onCanPlay={() => setVideoLoaded(true)}>
            <source src="/g.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-white text-sm">Loading background...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-green-200 shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-xl p-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-500">
                  <img src="/SF-logo.png" alt="SF Logo" className="w-16 h-16 object-contain" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/22c55e/ffffff?text=SF')} />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Sustainability Futures</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">{isCompleted ? 'Assessment Complete - Preparing Results' : 'ESG Assessment in Progress'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end">
              <div className="text-right">
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Welcome, {user.name}</div>
                <div className="text-xs sm:text-sm lg:text-base font-semibold text-green-600">{isCompleted ? 'Processing Results...' : `Question ${currentQuestionIndex + 1} of ${orderedQuestions.length}`}</div>
              </div>

              <button onClick={() => navigate('/')} className="group relative px-3 py-2 sm:px-4 text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <HomeIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                  <span className="sm:hidden">Home</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content Area */}
      <div className="pt-24 sm:pt-20 md:pt-20 py-8 px-4 flex-1 flex flex-col relative z-10">
        {!isCompleted && (
          <div className="max-w-4xl mx-auto relative z-10 mt-0 sm:mt-8">
            <div className={`mb-8 p-4 sm:p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm border-2 border-white/50 animate-slide-up`}>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center">
                    <Sparkles className="w-6 h-6 text-yellow-500 animate-spin mr-2" />
                    <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 drop-shadow-md`}>ESG Assessment</h2>
                  </div>
                  <p className={`text-sm md:text-base text-gray-800 drop-shadow-sm`}>Welcome, {user.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={onGoHome} className="flex items-center px-3 py-2 sm:px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 group text-sm sm:text-base">
                    <HomeIcon className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Home
                  </button>
                  <div className="text-right">
                    <div className={`text-xs sm:text-sm md:text-base text-gray-800 drop-shadow-sm`}>Question</div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 animate-pulse">{currentQuestionIndex + 1} / {orderedQuestions.length}</div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000 ease-out animate-pulse-glow" style={{ width: `${progress}%` }}></div>
              </div>
              <div className={`text-sm md:text-base text-center animate-bounce text-gray-800 drop-shadow-sm`}>{Math.round(progress)}% Complete</div>
            </div>

            <div className={`${getCategoryBg(currentQuestion.category)} rounded-2xl shadow-xl p-4 sm:p-8 border-2 transition-all duration-500 transform animate-slide-up ${isAnswering ? 'scale-105' : 'hover:scale-102'} bg-white/95 backdrop-blur-sm`}>
              <div className="text-center mb-8 animate-fade-in">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
                  {orderedCategories.map((category) => {
                    const isActive = category === currentQuestion.category;
                    return (
                      <div key={category} className={`inline-flex items-center px-3 py-2 sm:px-5 rounded-full font-semibold shadow-md transition-all duration-300 cursor-default select-none text-xs sm:text-sm md:text-base lg:text-lg ${isActive ? `text-white bg-gradient-to-r ${getCategoryColor(category)} animate-pulse-glow` : 'text-gray-600 bg-white border border-gray-200'}`}>
                        <Zap className={`w-4 h-4 mr-2 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                        {category}
                      </div>
                    );
                  })}
                </div>

                <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-slide-up text-gray-900 drop-shadow-lg`}>{currentQuestion.text}</h3>
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-slide-up text-gray-800 drop-shadow-md`} style={{ animationDelay: '0.2s' }}>{currentQuestion.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <button onClick={() => handleAnswer('yes')} disabled={isAnswering} className={`flex-1 flex items-center justify-center px-6 py-5 sm:px-8 sm:py-6 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300 transform ${isAnswering ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105'}`}>
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Yes
                </button>
                <button onClick={() => handleAnswer('no')} disabled={isAnswering} className={`flex-1 flex items-center justify-center px-6 py-5 sm:px-8 sm:py-6 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300 transform ${isAnswering ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:scale-105'}`}>
                  <XCircle className="w-6 h-6 mr-3" />
                  No
                </button>
                <button onClick={() => handleAnswer('na')} disabled={isAnswering} className={`flex-1 flex items-center justify-center px-6 py-5 sm:px-8 sm:py-6 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300 transform ${isAnswering ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl hover:scale-105'}`}>
                  <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full border-2 border-white/70 bg-white/10">
                    <span className="text-base font-bold">—</span>
                  </div>
                  Not Applicable
                </button>
                <button onClick={() => handleAnswer('maybe')} disabled={isAnswering} className={`flex-1 flex items-center justify-center px-6 py-5 sm:px-8 sm:py-6 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300 transform ${isAnswering ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-105'}`}>
                  <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full border-2 border-white/70 bg-white/10">
                    <span className="text-base font-bold">?</span>
                  </div>
                  Maybe
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm md:text-base text-gray-500">{currentQuestionIndex + 1} of {orderedQuestions.length} questions</p>
                {currentQuestionIndex === orderedQuestions.length - 1 && <p className="text-lg font-semibold text-green-600 mt-2 animate-pulse">Final Question - Almost Done!</p>}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
          <button onClick={() => { if (currentQuestionIndex > 0) { setCurrentQuestionIndex((prev) => prev - 1); setIsAnswering(false); } }} disabled={currentQuestionIndex === 0 || isAnswering} className="flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 text-gray-700 rounded-lg hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group animate-slide-left w-full sm:w-auto justify-center">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            <span className="md:text-lg">Previous</span>
          </button>

          <div className="text-center animate-fade-in">
            <div className="text-sm md:text-base text-white/80 drop-shadow-md">Category Progress</div>
            <div className="flex space-x-2 mt-1">
              {orderedCategories.map((category) => {
                const categoryQuestions = orderedQuestions.filter((q) => q.category === category);
                const answeredInCategory = answers.filter((a) => {
                  const question = orderedQuestions.find((q) => q.id === a.questionId);
                  return question?.category === category;
                }).length;
                const catProgress = categoryQuestions.length > 0 ? (answeredInCategory / categoryQuestions.length) * 100 : 0;

                return (
                  <div key={category} className="text-center">
                    <div className={`w-12 h-2 rounded-full bg-white/30 backdrop-blur-sm overflow-hidden shadow-inner`}>
                      <div className={`h-full bg-gradient-to-r ${getCategoryColor(category)} transition-all duration-1000`} style={{ width: `${catProgress}%` }}></div>
                    </div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">{category.charAt(0)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-24 animate-slide-right hidden sm:block"></div>
        </div>
      </div>

      {/* Site Footer (same as Home.jsx) */}
      <footer className="relative z-10 bg-green-950 text-gray-300 py-16 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12">
              <div className="space-y-6 md:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <img src="/SF-logo.png" alt="Sustainable Futures logo" className="w-12 h-12 object-contain" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white">
                    Sustainable <span className="block font-normal">Futures</span>
                  </h4>
                </div>
                <p className="text-gray-400">
                  At Sustainable Futures, our story began with a passion for creating a more sustainable future for our planet.
                </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="Email Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75" /></svg>
                  </a>
                  <a href="#" aria-label="Call Us" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-.184-5.253-2.6-5.438-5.438l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" /></svg>
                  </a>
                  <a href="#" aria-label="View Location" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transform transition-all duration-300 hover:scale-110">
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
                  <p className="flex items-start gap-3 text-base md:text-lg">
                    <svg className="w-6 h-6 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    <span>
                      Plot 146, JLPL Industrial Area<br />
                      Sector 82, Mohali (PB)<br />
                      India 140306
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:col-span-2 xl:col-span-1">
                <h4 className="text-xl md:text-2xl font-semibold text-white">Get in touch</h4>
                <form action="#" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                    <input type="email" placeholder="Email" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                  </div>
                  <input type="text" placeholder="Mobile" className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                  <textarea placeholder="Message" rows={4} required className="w-full p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-200 text-gray-900 border border-gray-300 flex items-center justify-center font-mono font-bold text-xl tracking-widest">
                      D8Y04I
                    </div>
                    <input type="text" placeholder="Enter Captcha" required className="p-4 rounded-lg bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors" />
                  </div>
                  <button type="submit" className="w-full py-4 px-6 rounded-lg bg-green-500 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                    Send Message
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
    </div>
  );
};

const HomeSplash = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(https://www.esa-automation.com/wp-content/uploads/2024/11/esg_blo_esa-copia.jpg)` }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="text-center bg-black/50 backdrop-blur-md p-6 sm:p-12 rounded-2xl shadow-xl max-w-md lg:max-w-xl animate-fade-in relative z-10 border-2 border-cyan-500/50">
        <img src="/SF-logo.png" alt="SF Logo" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white/20 rounded-full p-2" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/22c55e/ffffff?text=SF')} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">Welcome to the ESG Assessment</h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-8 drop-shadow-md">Click below to begin your Sustainability Futures assessment.</p>
        <button onClick={onStart} className="px-8 py-3 sm:py-4 w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg md:text-lg">
          Start Assessment
        </button>
      </div>
    </div>
  );
};

const Results = ({ score, onRestart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4 sm:p-8">
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(https://www.esa-automation.com/wp-content/uploads/2024/11/esg_blo_esa-copia.jpg)` }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-xl max-w-md lg:max-w-xl w-full animate-fade-in relative z-10 text-center">
        <Trophy className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-yellow-500 mb-4" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Assessment Complete!</h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8">Here is your score:</p>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-4">{score.totalScore.toFixed(0)} / {score.maxScore.toFixed(0)}</div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-8">{score.percentage.toFixed(1)}%</div>
        <div className="space-y-4 text-left mb-8">
          {Object.keys(score.byCategory).map((key) => {
            const categoryData = score.byCategory[key];
            const color = key === 'Environment' ? 'bg-green-500' : key === 'Social' ? 'bg-purple-500' : 'bg-blue-500';
            return (
              <div key={key} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{key}</h3>
                  <span className="font-semibold text-gray-700 md:text-lg">{categoryData.percentage.toFixed(1)}%</span>
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-2">{categoryData.score.toFixed(0)} / {categoryData.maxScore.toFixed(0)} points</p>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${categoryData.percentage}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onRestart} className="w-full px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all shadow-lg md:text-lg">
          Take Assessment Again
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');
  const [finalScore, setFinalScore] = useState(null);
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const safeUser = user || { id: null, name: 'Guest' };

  const handleStart = () => setCurrentView('game');
  const handleComplete = (answers, score) => {
    const questionMap = new Map(questions.map((question) => [question.id, question]));
    const questionDetails = answers
      .map((answer) => {
        const question = questionMap.get(answer.questionId);
        if (!question) return null;

        let points = 0;
        switch (answer.answer) {
          case 'yes':
            points = question.selectedPoints;
            break;
          case 'no':
            points = question.notSelectedPoints;
            break;
          case 'na':
            points = question.naPoints;
            break;
          case 'maybe':
            points = question.maybePoints;
            break;
          default:
            points = 0;
            break;
        }

        return {
          question: question.text,
          answer: answer.answer,
          points,
          category: question.category,
          description: question.description,
        };
      })
      .filter(Boolean);

    const enrichedScore = {
      ...score,
      questionDetails,
    };

    const token = localStorage.getItem('token');
    const hasAuth = Boolean(user?.id && token);

    if (user?.id) {
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/assessments/submit`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              userId: user.id,
              answers,
              scores: score,
            }),
          });

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            console.error('Assessment submission failed:', data.error || response.statusText);
          }
        } catch (error) {
          console.error('Assessment submission failed:', error);
        }
      })();
    }

    setFinalScore(enrichedScore);
    // Navigate to dashboard after showing completion screen
    setTimeout(() => {
      navigate('/dashboard', { 
        state: { 
          score: enrichedScore,
          user: safeUser,
          skipAuth: !hasAuth,
        } 
      });
    }, 3000);
  };
  const handleGoHome = () => navigate('/');
  const handleRestart = () => { setFinalScore(null); setCurrentView('home'); };

  if (currentView === 'home') return <HomeSplash onStart={handleStart} />;
  if (currentView === 'game') return <GameInterface user={safeUser} onComplete={handleComplete} onGoHome={handleGoHome} />;
  if (currentView === 'results') return finalScore ? <Results score={finalScore} onRestart={handleRestart} /> : <HomeSplash onStart={handleStart} />;
  return <HomeSplash onStart={handleStart} />;
};

export default App;

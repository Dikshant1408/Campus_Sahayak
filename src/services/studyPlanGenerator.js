import { generateStudyPlan } from './claudeAPI';

export const createStudyPlan = async (subjects, days) => {
  try {
    const plan = await generateStudyPlan(subjects, days);
    return plan;
  } catch (error) {
    // Fallback plan if API fails
    return {
      days: [
        { 
          day: "Monday", 
          tasks: [
            "Data Structures: Arrays & Linked Lists (3 hrs)", 
            "Practice 10 coding problems", 
            "Review class notes"
          ] 
        },
        { 
          day: "Tuesday", 
          tasks: [
            "DBMS: Normalization & ER Diagrams (2.5 hrs)", 
            "Solve previous year questions", 
            "Make revision notes"
          ] 
        },
        { 
          day: "Wednesday", 
          tasks: [
            "OS: Process Management (3 hrs)", 
            "Practice numerical problems", 
            "Watch tutorial videos"
          ] 
        },
        { 
          day: "Thursday", 
          tasks: [
            "Data Structures: Trees & Graphs (3 hrs)", 
            "Implement key algorithms", 
            "Group study session"
          ] 
        },
        { 
          day: "Friday", 
          tasks: [
            "DBMS: SQL queries & transactions (2.5 hrs)", 
            "Mock test practice", 
            "Review weak areas"
          ] 
        },
        { 
          day: "Saturday", 
          tasks: [
            "OS: Memory & Deadlock (2 hrs)", 
            "Full syllabus revision", 
            "Take practice test"
          ] 
        },
        { 
          day: "Sunday", 
          tasks: [
            "Light revision of all subjects", 
            "Solve doubt clearance", 
            "Early sleep before exam"
          ] 
        }
      ]
    };
  }
};

export const getStudyTips = (subject) => {
  const tips = {
    'Data Structures': [
      'Practice coding on paper first',
      'Understand time and space complexity',
      'Solve problems on LeetCode/HackerRank'
    ],
    'DBMS': [
      'Practice SQL queries daily',
      'Understand normalization with examples',
      'Draw ER diagrams for real scenarios'
    ],
    'OS': [
      'Understand concepts with real-world examples',
      'Practice numerical problems',
      'Make flowcharts for algorithms'
    ]
  };
  
  return tips[subject] || ['Study regularly', 'Practice problems', 'Review notes'];
};
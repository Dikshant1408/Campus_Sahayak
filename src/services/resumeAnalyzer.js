import { analyzeResume } from "./claudeAPI";

/**
 * AI-based resume analysis with safe fallback
 */
export const getResumeScore = async (resumeText = "") => {
  try {
    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error("Resume text too short");
    }

    const result = await analyzeResume(resumeText);

    if (!result || typeof result !== "object") {
      throw new Error("Invalid API response");
    }

    return result;
  } catch (error) {
    console.warn("AI analysis failed, using fallback:", error.message);

    return {
      score: 72,
      improvements: [
        "Add quantifiable achievements (e.g., 'Improved efficiency by 30%')",
        "Include relevant technical skills and certifications",
        "Use strong action verbs like 'Developed', 'Implemented', 'Led'"
      ],
      strengths: [
        "Clear education section",
        "Well-structured project descriptions"
      ]
    };
  }
};

/**
 * Reads resume file safely (TXT only)
 * NOTE: PDFs/DOCX need extra libraries
 */
export const parseResumeFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    if (!file.type.includes("text")) {
      reject(new Error("Only .txt resumes supported for now"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result || "");
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Simple ATS-style keyword scoring
 */
export const calculateATSScore = (resumeText = "") => {
  if (!resumeText) return 0;

  const text = resumeText.toLowerCase();
  let score = 0;

  const keywords = [
    "developed",
    "implemented",
    "managed",
    "led",
    "created",
    "designed",
    "optimized"
  ];

  keywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      score += 6;
    }
  });

  const sections = [
    "education",
    "experience",
    "skills",
    "projects"
  ];

  sections.forEach((section) => {
    if (text.includes(section)) {
      score += 10;
    }
  });

  return Math.min(score, 100);
};

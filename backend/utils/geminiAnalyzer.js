import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = "gemini-1.5-flash";

async function analyzeResume(resume, jobDescription) {
  console.log(" Starting analysis...");
  if (!resume || !jobDescription) {
    return fallbackResult("Missing resume or job description");
  }

  try {
    const aiResult = await tryAIAnalysis(resume, jobDescription);
    if (aiResult.matchedSkills.length > 0 || aiResult.missingSkills.length > 0) {
      return aiResult;
    }
  } catch (err) {
    console.log("Gemini AI failed:", err.message);
  }

  return performComprehensiveAnalysis(resume, jobDescription);
}

async function tryAIAnalysis(resume, jobDescription) {
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `
You are an expert ATS system. Analyze the RESUME against the JOB DESCRIPTION.

Reply in **exactly** the following format:
SCORE: [0-100]
MATCHED_SKILLS: skill1, skill2, skill3
MISSING_SKILLS: skillA, skillB
SUGGESTIONS: suggestion1 | suggestion2 | suggestion3

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  console.log(" Gemini Response:", text);
  return parseStructuredResponse(text);
}

function parseStructuredResponse(text) {
  const result = { score: 0, matchedSkills: [], missingSkills: [], suggestions: [] };

  const lines = text.split("\n").map(line => line.trim());
  for (const line of lines) {
    if (line.startsWith("SCORE:")) {
      result.score = Math.max(0, Math.min(100, parseInt(line.split(":")[1])));
    } else if (line.startsWith("MATCHED_SKILLS:")) {
      result.matchedSkills = line.split(":")[1].split(",").map(s => s.trim()).filter(Boolean);
    } else if (line.startsWith("MISSING_SKILLS:")) {
      result.missingSkills = line.split(":")[1].split(",").map(s => s.trim()).filter(Boolean);
    } else if (line.startsWith("SUGGESTIONS:")) {
      result.suggestions = line.split(":")[1].split("|").map(s => s.trim()).filter(Boolean);
    }
  }

  return result;
}

function performComprehensiveAnalysis(resume, jobDescription) {
  const resumeLower = resume.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  const skills = ['python', 'sql', 'javascript', 'aws', 'react', 'excel', 'machine learning'];
  const matchedSkills = [], missingSkills = [];

  for (const skill of skills) {
    if (jobLower.includes(skill)) {
      if (resumeLower.includes(skill)) matchedSkills.push(skill);
      else missingSkills.push(skill);
    }
  }

  const total = matchedSkills.length + missingSkills.length;
  const score = total ? Math.round((matchedSkills.length / total) * 100) : 0;

  const suggestions = missingSkills.slice(0, 3).map(s => `Consider learning ${s}`);

  return { score, matchedSkills, missingSkills, suggestions };
}

function fallbackResult(message) {
  return {
    score: 0,
    matchedSkills: [],
    missingSkills: [],
    suggestions: [message]
  };
}

async function analyzeResumeWithRetry(resume, jobDescription, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await analyzeResume(resume, jobDescription);
      return result;
    } catch (err) {
      if (i === retries - 1) {
        return fallbackResult("Failed after retries.");
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

export {
  analyzeResume,
  analyzeResumeWithRetry
};

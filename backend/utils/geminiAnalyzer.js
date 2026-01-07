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

  const skills = ["python", "sql", "javascript", "typescript", "node.js", "express",
    "react", "next.js", "angular", "vue", "java", "c++", "aws", "azure",
    "docker", "kubernetes", "graphql", "mongodb", "mysql", "postgresql",
    "html", "css", "tailwind", "machine learning", "data analysis", "excel"];
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




















// import dotenv from "dotenv";
// dotenv.config();
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const MODEL = "gemini-1.5-flash";

// /*
// ========================================================
//  MAIN PUBLIC FUNCTION
// ========================================================
// */

// async function analyzeResumeWithRetry(resume, jobDescription, retries = 2) {
//   for (let i = 0; i <= retries; i++) {
//     try {
//       return await analyzeResume(resume, jobDescription);
//     } catch (err) {
//       console.log(`Attempt ${i + 1} failed →`, err.message);

//       if (i === retries) {
//         return fallbackResult("AI processing failed after retries");
//       }

//       await new Promise(r => setTimeout(r, 1000));
//     }
//   }
// }

// /*
// ========================================================
//  MAIN ANALYSIS FLOW
// ========================================================
// */

// async function analyzeResume(resume, jobDescription) {
//   console.log("🚀 Starting Resume Analysis...");

//   if (!resume || !jobDescription) {
//     return fallbackResult("Missing resume or job description");
//   }

//   try {
//     const aiResult = await runGeminiAnalysis(resume, jobDescription);

//     const validated = validateAIResult(aiResult);

//     const scored = computeScore(validated);

//     return scored;
//   } catch (err) {
//     console.log("⚠️ Gemini AI failed → fallback applied:", err.message);
//     return performKeywordFallback(resume, jobDescription);
//   }
// }

// /*
// ========================================================
//  GEMINI STRICT JSON ANALYSIS
// ========================================================
// */

// async function runGeminiAnalysis(resume, jobDescription) {
//   const model = genAI.getGenerativeModel({ model: MODEL });

//   const prompt = `
// You are an ATS resume screening engine.

// Compare ONLY the SKILLS in the JOB DESCRIPTION against the RESUME.
// Do NOT assume missing skills.
// Do NOT reward irrelevant skills.
// Do NOT give 100 unless ALL required skills exist in resume.

// Steps you must follow:
// 1. Extract required skills ONLY from job description
// 2. Check if each exists in resume (case-insensitive)
// 3. Build lists:
//    - matchedSkills
//    - missingSkills
// 4. Score = matchedSkills / totalSkills * 100
// 5. Round to nearest integer
// 6. Suggest improvements

// ⚠ STRICT RULES:
// - DO NOT hallucinate skills
// - DO NOT rewrite inputs
// - DO NOT add commentary
// - Return ONLY valid JSON

// OUTPUT JSON FORMAT:
// {
//   "matchedSkills": ["skill1","skill2"],
//   "missingSkills": ["skillA","skillB"],
//   "suggestions": ["sentence1","sentence2"]
// }

// RESUME:
// ${resume}

// JOB DESCRIPTION:
// ${jobDescription}
// `;

//   const result = await model.generateContent(prompt);
//   const raw = result.response.text().trim();

//   console.log("🤖 RAW AI OUTPUT →", raw);

//   const parsed = JSON.parse(raw);
//   return parsed;
// }

// /*
// ========================================================
//  VALIDATION & SAFETY
// ========================================================
// */

// function validateAIResult(ai) {
//   return {
//     matchedSkills: Array.isArray(ai.matchedSkills) ? ai.matchedSkills : [],
//     missingSkills: Array.isArray(ai.missingSkills) ? ai.missingSkills : [],
//     suggestions: Array.isArray(ai.suggestions) ? ai.suggestions : []
//   };
// }

// /*
// ========================================================
//  BACKEND-SIDE SCORE (TRUE SOURCE OF TRUTH)
// ========================================================
// */

// function computeScore(result) {
//   const total = result.matchedSkills.length + result.missingSkills.length;

//   let score = total
//     ? Math.round((result.matchedSkills.length / total) * 100)
//     : 0;

//   score = Math.max(0, Math.min(100, score));

//   return {
//     score,
//     matchedSkills: result.matchedSkills,
//     missingSkills: result.missingSkills,
//     suggestions: result.suggestions
//   };
// }

// /*
// ========================================================
//  KEYWORD FALLBACK ENGINE
// ========================================================
// */

// function performKeywordFallback(resume, jobDescription) {
//   const resumeLower = resume.toLowerCase();
//   const jobLower = jobDescription.toLowerCase();

//   const skills = [
//     "python","sql","javascript","typescript",
//     "node.js","express","react","next.js",
//     "angular","vue","java","c++","aws",
//     "azure","docker","kubernetes","graphql",
//     "mongodb","mysql","postgresql","html",
//     "css","tailwind","machine learning",
//     "data analysis","excel"
//   ];

//   const matched = [];
//   const missing = [];

//   for (const s of skills) {
//     if (jobLower.includes(s)) {
//       resumeLower.includes(s) ? matched.push(s) : missing.push(s);
//     }
//   }

//   const total = matched.length + missing.length;

//   const score = total
//     ? Math.round((matched.length / total) * 100)
//     : 0;

//   return {
//     score,
//     matchedSkills: matched,
//     missingSkills: missing,
//     suggestions: missing.map(s => `Consider learning ${s}`)
//   };
// }

// /*
// ========================================================
//  FAIL-SAFE
// ========================================================
// */

// function fallbackResult(message) {
//   return {
//     score: 0,
//     matchedSkills: [],
//     missingSkills: [],
//     suggestions: [message]
//   };
// }

// /*
// ========================================================
//  EXPORTS
// ========================================================
// */

// export {
//   analyzeResume,
//   analyzeResumeWithRetry
// };

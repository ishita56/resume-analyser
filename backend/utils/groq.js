
const axios = require("axios");

async function extractSkillsWithAI(text) {
  try {

    const safeText = text.slice(0, 8000);

    const prompt = `
You are an ATS skill extraction engine.

Your task is to extract ALL important professional, technical, business, AI, QA, testing, analytics, HR-tech, and engineering keywords from the given text.

VERY IMPORTANT:
- Extract explicit AND contextual skills
- Extract technologies, methodologies, concepts, platforms, domains, and tools
- Extract testing concepts
- Extract AI/NLP concepts
- Extract HR-tech concepts
- Extract product management concepts
- Extract software engineering concepts
- Extract cloud/devops tools
- Extract APIs and databases

INCLUDE THINGS LIKE:
React, Node.js, MongoDB, Express, REST API, GraphQL, Docker, AWS, OCR, NLP, LLM, ATS, NER, Prompt Engineering, Regression Testing, Integration Testing, API Testing, Selenium, Postman, Jira, SaaS, KPI, Agile, Scrum, Product Strategy, QA Automation, PDF Parsing, Tesseract OCR.

STRICT RULES:
- Return ONLY comma separated keywords
- No explanations
- No numbering
- No headings
- No sentences
- No duplicates
- No generic soft skills
- If nothing found return ONLY: none

TEXT:
${safeText}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "You are a professional ATS skill extraction engine.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result =
      response.data?.choices?.[0]?.message
        ?.content || "";

    console.log(
      "RAW AI RESPONSE:",
      result
    );

    if (
      result.trim().toLowerCase() ===
      "none"
    ) {
      return [];
    }

    const cleanedSkills = result

      .split(/[,\n•]/)

      .map((s) =>
        s.trim().toLowerCase()
      )

      .filter(Boolean)

      .filter(
        (skill) =>

          skill.length > 2 &&

          skill.length < 40 &&

          !skill.includes(":") &&

          !skill.includes("output") &&

          !skill.includes("example") &&

          !skill.includes("strict") &&

          !skill.includes("rules") &&

          !skill.includes("text") &&

          !skill.includes("keyword") &&

          !skill.includes("skills") &&

          !skill.includes("technical") &&

          !skill.includes("professional") &&

          ![
            "communication",
            "teamwork",
            "leadership",
            "problem solving",
            "hardworking",
            "dedicated",
          ].includes(skill)
      );

    return [...new Set(cleanedSkills)];

  } catch (error) {

    console.log(
      "AI Extract Error:",
      error.response?.data ||
        error.message
    );

    return [];
  }
}

async function generateSuggestions(
  matchedSkills,
  missingSkills,
  score,
  jobRole
) {
  try {

    const verdict =
      score >= 80
        ? "Hire"
        : score >= 60
        ? "Maybe"
        : "Reject";

    const prompt = `
You are a strict ATS evaluation engine.

JOB ROLE:
${jobRole}

ATS SCORE:
${score}

MATCHED SKILLS:
${matchedSkills.join(", ")}

MISSING SKILLS:
${missingSkills.join(", ")}

TASK:
Generate a professional ATS evaluation report.

RULES:
- Do NOT invent technologies
- ONLY use skills provided
- Do NOT assume experience
- Do NOT generate fake projects
- Keep feedback concise
- Give realistic ATS feedback
- Mention important missing skills
- Do NOT change verdict

OUTPUT FORMAT:

1. ATS Evaluation

2. Why this score was given
- Bullet points

3. Missing Skills
- Bullet points

4. Suggestions to Improve Resume
- Bullet points

5. Final Verdict

Use exactly this verdict:
${verdict}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "You are a strict ATS engine.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.choices?.[0]
        ?.message?.content ||
      "AI suggestions unavailable"
    );

  } catch (error) {

    console.log(
      "Groq Error:",
      error.response?.data ||
        error.message
    );

    return "AI suggestions unavailable";
  }
}

module.exports = {
  extractSkillsWithAI,
  generateSuggestions,
};

const axios = require("axios");



async function extractSkillsWithAI(text) {
  try {
    const safeText = text.slice(0, 8000);

    const prompt = `
Extract ONLY technical skills.

STRICT RULES:
- Output ONLY comma separated values
- No explanation
- No numbering
- No extra words
- If no skills found return: none

TEXT:
${safeText}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
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

    if (
      result.toLowerCase().includes("none")
    ) {
      return [];
    }

    return result
      .split(",")
      .map((s) =>
        s.trim().toLowerCase()
      )
      .filter(Boolean);

  } catch (error) {

    console.log(
      "AI Extract Error:",
      error.response?.data || error.message
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
You are an ATS system used inside a recruitment engine.

JOB ROLE:
${jobRole}

ATS SCORE:
${score}

MATCHED SKILLS:
${matchedSkills.join(", ")}

MISSING SKILLS:
${missingSkills.join(", ")}

TASK:
Generate a strict ATS evaluation report.

RULES:
- You must NOT invent technologies
- ONLY use missing skills provided
- Do NOT assume experience
- Do NOT give generic advice
- Keep response concise
- Do NOT add extra skills
- Do NOT change verdict
- Ignore any technologies outside MATCHED SKILLS and MISSING SKILLS
- Never mention technologies not present in missing skills

OUTPUT FORMAT:

1. ATS Evaluation

2. Why this score was given
- bullet points

3. Improvement Suggestions

Output ONLY these missing skills:
${missingSkills.join(", ")}

Do not explain them.
Do not add descriptions.
Do not add any other technologies.

4. Final Verdict

You MUST use exactly this verdict:
${verdict}

Do NOT change it.
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
      error.response?.data || error.message
    );

    return "AI suggestions unavailable";
  }
}

module.exports = {
  extractSkillsWithAI,
  generateSuggestions,
};
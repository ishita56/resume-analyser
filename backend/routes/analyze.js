const express = require("express");
const router = express.Router();

const mammoth = require("mammoth");
const multer = require("multer");
const pdf = require("pdf-parse/lib/pdf-parse.js");

const Skill = require("../models/Skill");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const {
  generateSuggestions,
} = require("../utils/groq");

const storage = multer.memoryStorage();

const upload = multer({ storage });

let dbSkillsCache = [];


async function loadSkills() {
  dbSkillsCache = await Skill.find();

  console.log(
    "Skills loaded:",
    dbSkillsCache.length
  );
}

const skillMap = {
  "react.js": "react",
  reactjs: "react",

  "node.js": "node",
  nodejs: "node",

  "express.js": "express",

  "restful api": "rest api",
  "restful apis": "rest api",
};

function normalizeText(text) {

  text = text.toLowerCase();

  text = text.replace(
    /[^a-zA-Z0-9+.#/\s-]/g,
    " "
  );

  Object.keys(skillMap).forEach((key) => {

    const regex = new RegExp(
      key.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      ),
      "gi"
    );

    text = text.replace(
      regex,
      skillMap[key]
    );
  });

  text = text.replace(/\s+/g, " ");

  return text;
}

function escapeRegex(string) {
  return string.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

async function extractSkills(text) {

  const normalized =
    normalizeText(text);

  const foundSkills = [];

  dbSkillsCache.forEach((skill) => {

    const allNames = [
      skill.name,
      ...(skill.aliases || []),
    ];

    allNames.forEach((alias) => {

      const escaped =
        escapeRegex(
          alias.toLowerCase()
        );

      const regex = new RegExp(
        `\\b${escaped}\\b`,
        "i"
      );

      if (regex.test(normalized)) {

        foundSkills.push(skill.name);

        console.log(
          "FOUND ->",
          skill.name
        );
      }
    });
  });

  return [...new Set(foundSkills)];
}

function normalize(skill) {

  return skill
    .toLowerCase()
    .replace(/\.js/g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

router.post(
  "/analyze",
  upload.single("resume"),

  async (req, res) => {

    try {

      console.log("Route hit");

      // FIX
      if (dbSkillsCache.length === 0) {
        await loadSkills();
      }

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message:
            "No file uploaded",
        });
      }

      let text = "";

    
      if (
        req.file.mimetype ===
        "application/pdf"
      ) {

        const data = await pdf(
          req.file.buffer
        );

        text = data.text;

      }

      
      else if (

        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

      ) {

        const result =
          await mammoth.extractRawText({
            buffer: req.file.buffer,
          });

        text = result.value;

      }

      else {

        return res.status(400).json({
          success: false,
          message:
            "Only PDF and DOCX files are supported",
        });
      }

      text = text.replace(/\r\n/g, " ");
      text = text.replace(/\n/g, " ");
      text = text.replace(/\s+/g, " ");

      console.log("Resume Text:", text);

      const jdtext =
        req.body.jobdesc || "";

      const resumeskills =
        await extractSkills(text);

      const jdSkills =
        await extractSkills(jdtext);

      console.log(
        "RESUME SKILLS:",
        resumeskills
      );

      console.log(
        "JD SKILLS:",
        jdSkills
      );

      const alljdSkills = [
        ...new Set(jdSkills),
      ];

      const matchedSkills =
        alljdSkills.filter((skill) =>

          resumeskills.some(
            (r) =>
              normalize(r) ===
              normalize(skill)
          )
        );

      const missingSkills =
        alljdSkills.filter(
          (skill) =>

            !resumeskills.some(
              (r) =>
                normalize(r) ===
                normalize(skill)
            )
        );

      const total =
        alljdSkills.length;

      const matched =
        matchedSkills.length;

      const rawScore =
        total > 0
          ? (matched / total) * 100
          : 0;

      let score =
        Math.round(rawScore);

      if (score < 35) score = 35;
      if (score > 95) score = 95;

      const jobRole =
        jdtext
          .toLowerCase()
          .includes(
            "data engineer"
          )

          ? "Data Engineer"

          : jdtext
              .toLowerCase()
              .includes("backend")

          ? "Backend Developer"

          : jdtext
              .toLowerCase()
              .includes("frontend")

          ? "Frontend Developer"

          : "Software Engineer";

      let aiFeedback = "";

      try {

        aiFeedback =
          await generateSuggestions(
            matchedSkills,
            missingSkills,
            score,
            jobRole
          );

      } catch (err) {

        console.log(
          "AI ERROR:",
          err.message
        );

        aiFeedback =
          "AI suggestions unavailable.";
      }

      await ResumeAnalysis.create({

        filename:
          req.file.originalname,

        score,

        matchedSkills,

        missingSkills,

        suggestions:
          missingSkills.slice(0, 5),

        aiFeedback,
      });

      return res.status(200).json({

        success: true,

        message:
          "Resume analyzed successfully",

        meta: {

          file:
            req.file.originalname,

          jobRole,
        },

        data: {

          score,

          matchedSkills,

          missingSkills,

          suggestions:
            missingSkills.slice(0, 5),

          explanation:
            `Matched ${matched} out of ${total} skills`,

          aiFeedback,
        },
      });

    } catch (error) {

      console.log(
        "ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Error analyzing resume",

        error: error.message,
      });
    }
  }
);

router.get(
  "/history",
  async (req, res) => {

    try {

      const history =
        await ResumeAnalysis.find()
          .sort({ createdAt: -1 })
              .limit(3);

      res.status(200).json({
        success: true,
        history,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Error fetching history",
      });
    }
  }
);

module.exports = router;
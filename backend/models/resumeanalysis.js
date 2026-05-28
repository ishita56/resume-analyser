const mongoose = require("mongoose");

const resumeAnalysisSchema =
  new mongoose.Schema(
    {
      filename: {
        type: String,
      },

      score: {
        type: Number,
      },

      matchedSkills: [
        String,
      ],

      missingSkills: [
        String,
      ],

      suggestions: [
        String,
      ],

      aiFeedback: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);
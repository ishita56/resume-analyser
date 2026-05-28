const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  aliases: [String]
});

module.exports = mongoose.model(
  "Skill",
  skillSchema
);
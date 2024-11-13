// models/Intern.js
const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  program: { type: String, required: true },
  yearLevel: { type: Number, required: true },
  skills: { type: [String], required: true }, // Array of skills
  resume: { type: String }, // Path to resume file
  moa: { type: String }, // Path to MOA file
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('interns', internSchema);

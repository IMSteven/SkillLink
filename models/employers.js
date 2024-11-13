// models/Employer.js
const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true }
});

module.exports = mongoose.model('employers', employerSchema);

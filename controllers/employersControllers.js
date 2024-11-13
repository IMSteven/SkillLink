// controllers/employerController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employer = require('../models/employers');

exports.registerEmployer = async (req, res) => {
  const { fullName, email, password, companyName, companyAddress } = req.body;

  try {
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) return res.status(400).json({ message: 'Employer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employer = new Employer({
      fullName,
      email,
      password: hashedPassword,
      companyName,
      companyAddress
    });

    await employer.save();
    res.status(201).json({ message: 'Employer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employer' });
  }
};

exports.loginEmployer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });
    if (!employer) return res.status(400).json({ message: 'Employer not found' });

    const isPasswordCorrect = await bcrypt.compare(password, employer.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, employer });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

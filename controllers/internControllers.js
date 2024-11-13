// controllers/internController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Intern = require('../models/interns');
const upload = require('../config/multerConfig'); // Import your multer configuration

exports.registerIntern = [
  // Apply upload.fields() as middleware
  upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
      { name: 'agreement', maxCount: 1 }
  ]),
  async (req, res) => {
      console.log("Request Body:", req.body);

      const { fullName, email, password, confirmPassword, program, yearLevel, skills } = req.body;

      if (password !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
      }

      try {
          const existingIntern = await Intern.findOne({ email });
          if (existingIntern) {
              return res.status(400).json({ message: 'Intern already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const photo = req.files['photo'] ? req.files['photo'][0].path : null;
          const resume = req.files['resume'] ? req.files['resume'][0].path : null;
          const agreement = req.files['agreement'] ? req.files['agreement'][0].path : null;

          // Log file paths to confirm they are saved
          if (photo) console.log(`Photo saved at: ${photo}`);
          if (resume) console.log(`Resume saved at: ${resume}`);
          if (agreement) console.log(`Agreement saved at: ${agreement}`);

          const intern = new Intern({
              fullName,
              email,
              password: hashedPassword,
              program,
              yearLevel,
              skills: Array.isArray(skills) ? skills : skills.split(','),
              photo,
              resume,
              agreement
          });

          await intern.save();
          res.status(201).redirect('/login');
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error registering intern' });
          console.log('failed');
      }
  }
];

exports.loginIntern = async (req, res) => {
  const { email, password } = req.body;

  console.log("Request Body:", req.body);

  try {
    const intern = await Intern.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!intern) return res.status(400).json({ message: 'Intern not found' });

    const isPasswordCorrect = await bcrypt.compare(password, intern.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: intern._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, intern });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

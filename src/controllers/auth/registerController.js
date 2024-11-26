const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Joi = require('joi');

// Schema de validare a datelor primite
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const registerController = async (req, res) => {
    try {
        // Validarea datelor de intrare
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Invalid input', error: error.details[0].message });
        }

        const { name, email, password } = req.body;

        // Verificarea dacă utilizatorul există deja
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Criptarea parolei
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crearea utilizatorului
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

module.exports = { registerController };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Găsește utilizatorul după email
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compară parola introdusă cu parola criptată din baza de date
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Entered password:', password);
        console.log('Stored password:', user.password);
        console.log('Password validation result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generează un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginController:', error.message);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = { loginController };
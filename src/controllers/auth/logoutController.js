const blacklist = []; // Într-un caz real, poți folosi Redis sau o bază de date

const logoutController = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token is required for logout' });
    }

    // Adaugă token-ul în blacklist
    blacklist.push(token);
    res.json({ message: 'Logout successful' });
};

module.exports = { logoutController, blacklist };
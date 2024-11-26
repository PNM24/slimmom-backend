const Day = require('../../models/Day'); // Import corect al modelului Day

const dayInfoController = async (req, res) => {
    try {
        const { date } = req.params; // Extrage parametrul date din URL
        const userId = req.user.id; // userId extras din middleware-ul de autentificare

        // Găsește ziua corespunzătoare în baza de date
        const day = await Day.findOne({ userId, date }).populate('consumedProducts.productId');

        if (!day) {
            return res.status(404).json({ message: 'Day not found' }); // Returnează eroare 404 dacă ziua nu există
        }

        res.status(200).json(day); // Returnează datele despre ziua respectivă
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch day information', error: error.message });
    }
};

module.exports = { dayInfoController };
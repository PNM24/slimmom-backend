const Day = require('../../models/Day'); // Corectarea căii modelului

const deleteConsumedProductController = async (req, res) => {
    try {
        const { date } = req.params; // Data specificată în parametri
        const { productId } = req.body; // ID-ul produsului de șters din corpul cererii
        const userId = req.user.id; // ID-ul utilizatorului din middleware-ul de autentificare

        // Validarea datelor primite
        if (!date || !productId) {
            return res.status(400).json({ message: 'Date and productId are required' });
        }

        // Găsirea și actualizarea zilei
        const day = await Day.findOneAndUpdate(
            { userId, date }, // Condiția de căutare
            { $pull: { consumedProducts: { productId } } }, // Eliminarea produsului specific
            { new: true } // Returnează documentul actualizat
        );

        if (!day) {
            return res.status(404).json({ message: 'Day not found' }); // Eroare dacă ziua nu există
        }

        res.status(200).json({ message: 'Product removed from consumed list', day });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove consumed product', error: error.message });
    }
};

module.exports = { deleteConsumedProductController };
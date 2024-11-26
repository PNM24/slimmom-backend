const bcrypt = require('bcryptjs');

const testPassword = async () => {
    const enteredPassword = '1pass123'; // Parola introdusă
    const storedPasswordHash = '$2a$10$4Oe.uOHm8ot3yLl51d/zEOrsqxis0Vd1hy8Jfhhbz7TT0MUGV5ybO'; // Hash-ul din baza de date

    const isMatch = await bcrypt.compare(enteredPassword, storedPasswordHash);
    console.log(isMatch ? 'Password matches' : 'Invalid password');
};

testPassword();
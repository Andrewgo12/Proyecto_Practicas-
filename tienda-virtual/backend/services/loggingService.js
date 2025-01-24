// services/login.js
const { login } = require('./auth');

const loginUser = async (email, password) => {
    try {
        const token = await login(email, password);
        return { token };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { loginUser };

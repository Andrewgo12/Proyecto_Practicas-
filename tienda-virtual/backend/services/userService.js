// services/user.js
const User = require('../models/User');

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    return user;
};

const updateUserProfile = async (userId, updatedData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) throw new Error('Usuario no encontrado');

    return updatedUser;
};

module.exports = { getUserById, updateUserProfile };

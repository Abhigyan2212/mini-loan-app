const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10);  // Salt rounds for bcrypt
    this.password = await bcrypt.hash(this.password, salt);  // Hash password
    next();
  } catch (error) {
    next(error);  // If error, pass it to the next middleware
  }
});

// Method to compare the password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare hashed password
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  state: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  scheduledRepayments: [
    {
      date: { type: Date, required: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    },
  ],
});

module.exports = mongoose.model('Loan', loanSchema);

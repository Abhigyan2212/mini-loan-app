const Loan = require('../models/Loan');

// Create a loan request
exports.createLoan = async (req, res) => {
  const { amount, term, customerId } = req.body;
  try {
    const loan = new Loan({
      customerId,
      amount,
      term,
      scheduledRepayments: Array.from({ length: term }, (v, i) => ({
        date: new Date(new Date().setDate(new Date().getDate() + (i + 1) * 7)),
        amount: (amount / term).toFixed(2),
      })),
    });

    await loan.save();
    res.status(201).json({ loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve a loan
exports.approveLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.state = 'APPROVED';
    await loan.save();
    res.status(200).json({ loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get loans for a customer
exports.getCustomerLoans = async (req, res) => {
  const { userId } = req.user; // Assuming JWT adds userId to req.user
  try {
    const loans = await Loan.find({ customerId: userId });
    res.status(200).json({ loans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

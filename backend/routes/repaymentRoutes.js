const express = require('express');
const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Add a repayment
router.post('/repayment', authenticate, async (req, res) => {
  const { loanId, amount } = req.body;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan || loan.state !== 'APPROVED') return res.status(404).json({ message: 'Loan not found or not approved' });

    const repayment = new Repayment({
      loanId,
      repaymentDate: new Date(),
      amount,
    });

    await repayment.save();

    const repaymentIndex = loan.scheduledRepayments.findIndex(r => r.status === 'PENDING');
    if (repaymentIndex > -1) {
      loan.scheduledRepayments[repaymentIndex].status = 'PAID';
      await loan.save();
    }

    res.status(201).json({ repayment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

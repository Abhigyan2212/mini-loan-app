const express = require('express');
const Loan = require('../models/Loan');  // Loan model
const Repayment = require('../models/Repayment');  // Repayment model
const authenticate = require('../middleware/authMiddleware'); // JWT authentication middleware
const authorize = require('../middleware/roleMiddleware'); // Role-based authorization middleware (optional)

const router = express.Router();

// 1. Create a new loan (POST /loan)
router.post('/loan', authenticate, async (req, res) => {
  const { amount, term, customerId } = req.body;

  try {
    // Calculate the repayment amount for each scheduled repayment
    const scheduledRepayments = Array.from({ length: term }, (v, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() + (i + 1) * 7)),  // Weekly repayments
      amount: (amount / term).toFixed(2),
      status: 'PENDING',  // Initial status for each repayment
    }));

    const loan = new Loan({
      customerId,
      amount,
      term,
      state: 'PENDING',  // Initial loan state
      scheduledRepayments,
    });

    await loan.save();  // Save the loan to MongoDB
    res.status(201).json({ loan });  // Send the loan data as response
  } catch (error) {
    res.status(400).json({ message: error.message });  // Handle errors
  }
});

// 2. View all loans for the logged-in user (GET /loan)
router.get('/loan', authenticate, async (req, res) => {
  const { userId } = req.user;  // userId added by the authentication middleware

  try {
    const loans = await Loan.find({ customerId: userId }).populate('customerId', 'email');
    res.status(200).json({ loans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update loan state to "APPROVED" (PUT /loan/:id/approve)
router.put('/loan/:id/approve', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.state = 'APPROVED';  // Update the state to "APPROVED"
    await loan.save();
    res.status(200).json({ loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Add repayment for a loan (POST /repayment)
router.post('/repayment', authenticate, async (req, res) => {
  const { loanId, amount } = req.body;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan || loan.state !== 'APPROVED') {
      return res.status(404).json({ message: 'Loan not found or not approved' });
    }

    // Create a repayment entry
    const repayment = new Repayment({
      loanId,
      repaymentDate: new Date(),
      amount,
    });

    await repayment.save();  // Save the repayment to MongoDB

    // Find the first pending scheduled repayment and mark it as "PAID"
    const repaymentIndex = loan.scheduledRepayments.findIndex(r => r.status === 'PENDING');
    if (repaymentIndex > -1) {
      loan.scheduledRepayments[repaymentIndex].status = 'PAID';
      await loan.save();  // Update the loan with the updated repayments
    }

    res.status(201).json({ repayment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

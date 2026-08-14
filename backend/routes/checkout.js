const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { Kelviq } = require('@kelviq/node-sdk');

// This endpoint initiates a checkout session
router.post('/create-session', async (req, res) => {
  try {
    const { planId, clientKey } = req.body;
    const userId = req.auth.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const serverKey = process.env.KELVIQ_SERVER_API_KEY;
    if (!serverKey) {
      return res.status(500).json({ error: 'Payment server key not configured.' });
    }

    console.log(`[Kelviq] Processing checkout for user ${userId} on plan ${planId}`);
    
    // Initialize Kelviq SDK
    const client = new Kelviq({
      accessToken: serverKey,
      environment: 'production'
    });

    // Create a customer record in Kelviq (Optional but recommended)
    try {
      await client.customers.create({
        customerId: userId,
        name: "PatternFlow User"
      });
      console.log(`[Kelviq] Customer record ensured for ${userId}`);
    } catch (err) {
      console.log(`[Kelviq] Customer creation note (safe to ignore if already exists): ${err.message}`);
    }

    // Determine correct checkout URL based on plan
    let checkoutUrl = '';
    if (planId === 'monthly') {
      checkoutUrl = 'https://www.kelviq.com/buy/e8575c85-44ac-40f3-ad3c-650161c98b66/?enabled=plans%2Cyearly-plan&plan_identifier=plans&charge_period=MONTHLY';
    } else if (planId === 'yearly') {
      checkoutUrl = 'https://www.kelviq.com/buy/e8575c85-44ac-40f3-ad3c-650161c98b66/?enabled=plans%2Cyearly-plan&plan_identifier=plans&charge_period=YEARLY';
    } else {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Append customer_id and success redirect URL
    const successUrl = encodeURIComponent('http://localhost:5173/upload?payment_success=true');
    const finalUrl = `${checkoutUrl}&customer_id=${userId}&success_url=${successUrl}`;

    res.json({
      success: true,
      url: finalUrl,
      message: 'Checkout session created successfully.'
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'An error occurred during checkout initialization.' });
  }
});

module.exports = router;

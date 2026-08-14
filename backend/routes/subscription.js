const express = require('express');
const router = express.Router();
const { Kelviq } = require('@kelviq/node-sdk');

// GET /api/subscription/status
// Returns the current user's subscription/entitlement status
router.get('/status', async (req, res) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.json({ isPro: false, plan: null });
    }

    const serverKey = process.env.KELVIQ_SERVER_API_KEY;
    if (!serverKey) {
      return res.json({ isPro: false, plan: null });
    }

    const client = new Kelviq({ 
      accessToken: serverKey,
      environment: 'production',
      enableCache: false // Disable cache so the UI updates instantly after payment
    });

    try {
      const ent = await client.entitlements.getEntitlement({
        customerId: userId,
        featureId: "7days",
      });

      console.log(`[Kelviq] getEntitlement response for ${userId}:`, JSON.stringify(ent, null, 2));

      if (ent && ent.hasAccess) {
        return res.json({ 
          isPro: true, 
          plan: "Pro" 
        });
      }

      // Fallback: Check if they have an active subscription for this specific product
      // (in case the 7days feature isn't attached to the plan in the dashboard yet)
      const productId = '8a50795c-c8b9-43e5-8f2c-dd77e7052efc';
      const subs = await client.subscriptions.list({ customerId: userId });
      const hasActiveSub = subs && subs.results && subs.results.some(s => 
        s.status === 'active' && s.product?.id === productId
      );
      
      if (hasActiveSub) {
        return res.json({ isPro: true, plan: "Pro" });
      }

      return res.json({ isPro: false, plan: null });
    } catch (err) {
      console.log(`[Kelviq] Entitlement check for status: ${err.message}`);
    }

    return res.json({ isPro: false, plan: null });

  } catch (error) {
    console.error('Subscription status error:', error);
    res.json({ isPro: false, plan: null });
  }
});

module.exports = router;

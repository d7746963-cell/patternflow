const { Kelviq } = require('@kelviq/node-sdk');

async function check() {
  const client = new Kelviq({
    accessToken: 'server-02717733-56f8-457f-9182-6c2b3b5b07fc:698f7797-22de-41e1-a0bd-b047cdf8602b',
    environment: 'sandbox'
  });

  const subs = await client.subscriptions.list({ customerId: 'user_3HYIl5Q9dkeQ89v9k9DyvbuzovH' });
  console.log('Subscriptions:', JSON.stringify(subs, null, 2));
}

check().catch(console.error);

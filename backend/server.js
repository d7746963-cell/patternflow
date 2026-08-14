const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
dotenv.config();

const analyzeRoute = require('./routes/analyze');
const chatRouter = require('./routes/chat');
const checkoutRouter = require('./routes/checkout');
const newsRouter = require('./routes/news');
const subscriptionRouter = require('./routes/subscription');

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean); // removes undefined

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
// Apply Clerk middleware to protect these routes
app.use('/api/analyze', ClerkExpressRequireAuth({ requireAuth: false }), analyzeRoute);
app.use('/api/chat', ClerkExpressRequireAuth(), chatRouter);
app.use('/api/checkout', ClerkExpressRequireAuth(), checkoutRouter);
app.use('/api/news', ClerkExpressRequireAuth(), newsRouter);
app.use('/api/subscription', ClerkExpressRequireAuth(), subscriptionRouter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy to fetch images from external URLs (like TradingView) bypassing CORS
app.post('/api/fetch-image', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.set('Content-Type', response.headers.get('content-type') || 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching image proxy:', error);
    res.status(500).json({ error: 'Failed to fetch image from the provided URL' });
  }
});

// Catch-all route to serve the frontend index.html for client-side routing
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).json({ error: 'Unauthenticated or Invalid Token' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;

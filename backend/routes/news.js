const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

router.post('/', async (req, res) => {
  try {
    const { ticker, asset_type } = req.body;
    
    if (!ticker && !asset_type) {
      return res.status(400).json({ error: 'Ticker or asset type is required' });
    }

    const searchQuery = ticker 
      ? `latest financial news for ${ticker} stock today`
      : (asset_type ? `latest financial news for ${asset_type} market today` : `latest stock market news today`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `Search Google for: ${searchQuery}. Return exactly 3 recent and highly relevant news articles. Format the response strictly as a JSON object with this structure: { "news": [ { "headline": "...", "summary": "...", "source": "...", "time": "...", "impact": "A concise 1-2 sentence explanation of how this news is likely to affect the stock price, investor sentiment, or chart." } ] }` }] }
      ],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    let jsonText = response.text;
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const parsedResponse = JSON.parse(jsonText);
    res.json(parsedResponse);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;

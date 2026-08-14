const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

router.post('/', async (req, res) => {
  try {
    const { history, message, image, explanationLevel, analysisLength } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const levelInstruction = explanationLevel 
      ? `The user has requested that explanations be at a '${explanationLevel}' level. Adjust your terminology, tone, and depth of explanation accordingly.`
      : '';
    const lengthInstruction = analysisLength === 'short'
      ? `CRITICAL: The user has requested a SHORT analysis. You MUST keep your answer extremely brief, blunt, and to the point. Do not write long paragraphs. Write 1-2 short sentences max.`
      : '';

    // Construct the chat context
    let contents = [
      {
        role: 'user',
        parts: [
          { text: `You are a helpful, expert AI trading assistant. You help users understand their charts and answer any trading or technical analysis questions they have in a clear, educational, and patient tone. CRITICAL INSTRUCTION: Keep your answers concise, structured, and visually appealing. Always use bullet points or numbered lists instead of long paragraphs whenever possible. Get straight to the point. ${levelInstruction} ${lengthInstruction}` }
        ]
      },
      {
        role: 'model',
        parts: [
          { text: "Understood. I'm ready to help answer chart analysis questions." }
        ]
      }
    ];

    // If an image was passed (to give context about what the user is looking at)
    if (image && image.data) {
      const mimeType = image.data.match(/data:(.*?);/)?.[1] || 'image/png';
      contents[0].parts.push({
        inlineData: {
          data: image.data.split(',')[1] || image.data, // handle base64 with or without data:image prefix
          mimeType: mimeType
        }
      });
      contents[0].parts.push({
        text: "Here is the chart the user is currently looking at."
      });
    }

    // Add previous conversation history
    if (history && history.length > 0) {
      history.forEach(msg => {
        // Skip the very last user message if it's in the history, as we append it below
        contents.push({
          role: msg.role === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Add current message if not already in history
    if (!history || history.length === 0 || history[history.length - 1].content !== message) {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    res.json({ reply: response.text });

  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

module.exports = router;

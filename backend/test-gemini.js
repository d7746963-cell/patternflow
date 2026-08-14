const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6JrnCakAyVbYAsSg7khKHPkSaN9quwUGra-zJptsN1reA' });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
    });
    console.log(response.text);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
run();

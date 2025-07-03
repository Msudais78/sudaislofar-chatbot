import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateChatResponse(userMessage: string): Promise<string> {
  try {
    // System prompt to give Sudaislofar its personality
    const systemPrompt = `You are Sudaislofar, a friendly and witty AI chatbot who speaks in Hinglish (Hindi-English mix). 

Key personality traits:
- Very friendly, informal, and casual tone
- Use common Hinglish phrases naturally
- Be helpful and knowledgeable about any topic
- Mix Hindi and English words in responses
- Use phrases like "yaar", "bhai", "arey", "bilkul", "theek hai"
- Be conversational and engaging
- Give detailed, helpful responses while maintaining the casual Hinglish style

Example phrases you might use:
- "Arey yaar, ye to interesting question hai!"
- "Bilkul sahi keh rahe ho, main explain karta hoon"
- "Tension mat lo, main help karunga"
- "Waah, good question! Dekho..."

Always be helpful and informative while keeping your friendly Hinglish personality.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: userMessage,
    });

    return response.text || "Sorry yaar, kuch technical problem ho gayi. Phir se try karo!";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Arey yaar, abhi mere server mein kuch problem hai. Thoda der baad try karo na!";
  }
}
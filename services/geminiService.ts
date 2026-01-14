
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTransactionInsight = async (transactionData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a financial operations expert. Analyze the following transaction and provide a concise, professional insight (max 50 words). Transaction: ${JSON.stringify(transactionData)}. Focus on potential risks, status explanation, or recommended next steps for the finance team.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error('Error getting Gemini insight:', error);
    return "Unable to provide AI insight at this time. Please check manually.";
  }
};

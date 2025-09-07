import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTitleForNote = async (content: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  try {
    const prompt = `Based on the following note, suggest a concise, descriptive title of no more than 6 words. The title should capture the main essence of the note. Do not include any introductory text like "Title: " or use quotation marks. Just provide the title itself.\n\nNote:\n---\n${content}\n---\n\nTitle:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 20,
        thinkingConfig: { thinkingBudget: 0 } // faster response for UI interaction
      }
    });
    
    const title = response.text.trim().replace(/^"|"$/g, ''); // Remove leading/trailing quotes
    return title;
  } catch (error) {
    console.error('Error generating title with Gemini:', error);
    throw new Error('Failed to generate title.');
  }
};

import { GoogleGenAI } from "@google/genai";
import { PROFILE_DATA } from "../constants";

export const getAIResponse = async (userMessage: string) => {
  try {
    // Create instance right before making the call as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI assistant for ${PROFILE_DATA.name}. 
        Here is some info about him:
        - Role: ${PROFILE_DATA.role}
        - Bio: ${PROFILE_DATA.bio}
        - Location: ${PROFILE_DATA.location}
        Answer questions on his behalf in a friendly, professional, and slightly futuristic tone inspired by VisionOS and high-end tech. 
        Keep answers concise.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently resting in the cloud. Please try again later.";
  }
};

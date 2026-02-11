import { GoogleGenerativeAI } from '@google/generative-ai';
import { personas } from './personas';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Create a Gemini chat session for a specific persona.
 * Each persona has its own system instruction that shapes the AI's personality.
 */
export function createChat(personaId) {
  const persona = personas.find(p => p.id === personaId);
  if (!persona) throw new Error(`Unknown persona: ${personaId}`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: persona.systemInstruction,
  });

  const chat = model.startChat({
    history: [],
  });

  return chat;
}

/**
 * Send a message to the Gemini chat and return the AI response text.
 */
export async function sendMessage(chat, text) {
  const result = await chat.sendMessage(text);
  const response = result.response;
  return response.text();
}

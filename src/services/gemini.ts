import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCustomQuiz(topic: string): Promise<Question[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buatlah 5 soal kuis pilihan ganda tentang topik: "${topic}". 
      Setiap soal harus memiliki:
      - Pertanyaan yang jelas
      - 4 pilihan jawaban (A, B, C, D)
      - Indeks jawaban yang benar (0-3)
      - Penjelasan singkat mengapa jawaban tersebut benar.
      Bahasa: Indonesia.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswer: { type: Type.NUMBER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Tidak ada respon dari AI");
    
    return JSON.parse(text) as Question[];
  } catch (error) {
    console.error("Gagal generate kuis:", error);
    throw error;
  }
}

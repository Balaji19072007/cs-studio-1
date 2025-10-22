
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Gets a helpful explanation from the AI tutor for a given topic and question.
 * @param topic The course topic (e.g., "React Fundamentals").
 * @param question The user's question.
 * @returns A string containing the AI's explanation.
 */
export async function getAITutorResponse(topic: string, question: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `You are an expert and friendly computer science tutor named "CS Studio Tutor". 
You are helping a student who is studying a course on "${topic}".
Your goal is to explain concepts clearly, concisely, and in a way that is easy for a beginner to understand.
Do not start your response with an apology. Be direct and helpful.
Use simple language and provide code examples if relevant. Format your response for readability in a plain text block.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for AI Tutor:", error);
    throw new Error("Failed to get response from AI tutor.");
  }
}

/**
 * Gets a targeted hint for a specific coding problem.
 * @param problemTitle The title of the coding problem.
 * @param problemStatement The full statement of the problem.
 * @param userCode The user's current code attempt.
 * @returns A string containing a helpful hint.
 */
export async function getHintForProblem(problemTitle: string, problemStatement: string, userCode: string): Promise<string> {
  try {
    const prompt = `
      Problem Title: ${problemTitle}
      Problem Statement: ${problemStatement}
      User's Current Code:
      \`\`\`
      ${userCode || "// User has not written any code yet."}
      \`\`\`
      Based on the user's code for the problem above, provide a single, concise, and helpful hint to guide them in the right direction. Do not give away the full solution. Focus on the next logical step or a potential misunderstanding.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
        systemInstruction: "You are an AI programming assistant providing hints for coding problems. Your goal is to help, not to solve. Keep hints short and focused.",
        temperature: 0.5,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for hint:", error);
    throw new Error("Failed to get a hint from the AI assistant.");
  }
}


/**
 * Explains a given code solution in the context of a problem.
 * @param problemTitle The title of the coding problem.
 * @param solutionCode The optimal code solution.
 * @returns A string containing a detailed explanation of the code.
 */
export async function explainCodeSolution(problemTitle: string, solutionCode: string): Promise<string> {
  try {
    const prompt = `
      Problem Title: ${problemTitle}
      
      Provided Solution Code:
      \`\`\`
      ${solutionCode}
      \`\`\`

      Explain this solution code step-by-step. Break down the logic, explain the purpose of key variables and functions, and discuss the overall strategy of the algorithm. Format the explanation for readability.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior software engineer explaining an optimal code solution to a student. Be clear, thorough, and pedagogical.",
        temperature: 0.3,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for solution explanation:", error);
    throw new Error("Failed to get an explanation from the AI assistant.");
  }
}

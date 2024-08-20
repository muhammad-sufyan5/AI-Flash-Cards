"use server";

const keyGroq = process.env.keyGroq;

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: keyGroq });

export async function askLLM(title: string, content: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a flashcard generator designed to help users create study materials based on titles or content they provide. Your task is to generate concise and informative flashcards. Each flashcard should contain a clear question or prompt on the front and a precise answer or explanation on the back. Ensure the content is accurate, educational, and tailored to the user's learning objectives.

Guidelines:
1. Interpret the title or content provided by the user to identify key concepts, facts, or definitions.
2. Generate flashcards that reflect essential information, ensuring the content is well-organized and easy to understand.
3. Provide a question or cue that prompts the user to recall information related to the topic.
4. Provide a clear and accurate answer or explanation on the back of the flashcard.
5. Only generate one flashcard

Format:
- **Front:** Question or prompt.
- **Back:** Answer or explanation.
- A json format : {"front": "", "back": ""}  }
- only return the json response. no extra sentence or words. 

Examples:
- **Front:** What is the capital of France?
  **Back:** Paris.
- **Front:** Define photosynthesis.
  **Back:** Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.

You should adapt to various subjects and levels of complexity based on the user's needs. Be concise, clear, and focused on the core concepts or facts of the provided content.
`,
      },
      {
        role: "user",
        content: `title is ${title}. background is ${content}`,
      },
    ],
    model: "llama3-70b-8192",
  });
  const response = chatCompletion.choices[0]?.message?.content || "";
  console.log(response);
  return response;
}

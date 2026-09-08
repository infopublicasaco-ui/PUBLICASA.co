import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export type AIProvider = "claude" | "gpt";

export async function generateWithClaude(prompt: string): Promise<string | null> {
  if (!anthropic) return null;

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (message.content[0].type === "text") {
      return message.content[0].text;
    }
    return null;
  } catch (error) {
    console.error("Claude API error:", error);
    return null;
  }
}

export async function generateWithOpenAI(prompt: string): Promise<string | null> {
  if (!openai) return null;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (response.choices[0].message.content) {
      return response.choices[0].message.content;
    }
    return null;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return null;
  }
}

export async function generateWithFallback(prompt: string): Promise<string | null> {
  // Intenta Claude primero, fallback a OpenAI
  const claudeResult = await generateWithClaude(prompt);
  if (claudeResult) return claudeResult;

  const openaiResult = await generateWithOpenAI(prompt);
  if (openaiResult) return openaiResult;

  return null;
}

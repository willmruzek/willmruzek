import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import dedent from "dedent";

import { getSiteContent } from "@/lib/site-content";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const siteContent = await getSiteContent();

  const systemPrompt = dedent`
    You are a helpful assistant for Will Mruzek's personal website (willmruzek.com).
    Your job is to answer questions about Will — his background, professional experience, skills, projects,
    interests, and anything else covered on this website.

    Answer based only on the information provided below. If a question falls outside what's covered,
    say so honestly and briefly. Keep responses concise and friendly.

    Here is all the content from Will's website:

    ${siteContent}
  `;

  const result = streamText({
    model: openai("gpt-5.4"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

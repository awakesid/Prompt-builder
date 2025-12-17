
'use server';
/**
 * @fileOverview This flow beautifies a given prompt by enriching it with descriptive details.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {
  BeautifyPromptInputSchema,
  type BeautifyPromptInput,
  BeautifyPromptOutputSchema,
  type BeautifyPromptOutput,
} from './types';

export async function beautifyPrompt(
  input: BeautifyPromptInput
): Promise<BeautifyPromptOutput> {
  return beautifyPromptFlow(input);
}

const beautifyPromptFlow = ai.defineFlow(
  {
    name: 'beautifyPromptFlow',
    inputSchema: BeautifyPromptInputSchema,
    outputSchema: BeautifyPromptOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `You are an AI assistant that specializes in prompt engineering.
Your task is to take a user's prompt and "beautify" it by adding vivid and descriptive details.
Make the prompt more evocative and imaginative, but do not fundamentally change the user's core request.
The beautified prompt should be a drop-in replacement for the original.

Original Prompt:
'${input.prompt}'

Beautified Prompt:`,
      output: {
        schema: BeautifyPromptOutputSchema,
      },
    });

    return output!;
  }
);


'use server';
/**
 * @fileOverview This flow expands a given prompt by generating several variations.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {
  ExpandPromptInputSchema,
  type ExpandPromptInput,
  ExpandPromptOutputSchema,
  type ExpandPromptOutput,
} from './types';

export async function expandPrompt(
  input: ExpandPromptInput
): Promise<ExpandPromptOutput> {
  return expandPromptFlow(input);
}

const expandPromptFlow = ai.defineFlow(
  {
    name: 'expandPromptFlow',
    inputSchema: ExpandPromptInputSchema,
    outputSchema: ExpandPromptOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `You are an AI assistant that specializes in prompt engineering.
Your task is to take a user's prompt and "expand" it by generating 3 to 5 different variations.
These variations should explore different angles, styles, or interpretations of the original concept.
Format the output as a Markdown list.

Original Prompt:
'${input.prompt}'

Expanded Prompts:`,
      output: {
        schema: ExpandPromptOutputSchema,
      },
    });

    return output!;
  }
);

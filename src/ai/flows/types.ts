/**
 * @fileOverview This file contains the shared types and schemas for the AI flows.
 */

import {z} from 'zod';

// Types for beautify-prompt-flow
export const BeautifyPromptInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt to be beautified.'),
});
export type BeautifyPromptInput = z.infer<typeof BeautifyPromptInputSchema>;

export const BeautifyPromptOutputSchema = z.object({
  beautifiedPrompt: z
    .string()
    .describe('The beautified version of the prompt.'),
});
export type BeautifyPromptOutput = z.infer<typeof BeautifyPromptOutputSchema>;

// Types for expand-prompt-flow
export const ExpandPromptInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt to be expanded.'),
});
export type ExpandPromptInput = z.infer<typeof ExpandPromptInputSchema>;

export const ExpandPromptOutputSchema = z.object({
  expandedPrompt: z
    .string()
    .describe(
      'A list of 3-5 expanded and varied versions of the original prompt, formatted as a markdown list.'
    ),
});
export type ExpandPromptOutput = z.infer<typeof ExpandPromptOutputSchema>;

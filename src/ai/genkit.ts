
/**
 * @fileOverview This file initializes and configures the Genkit AI instance.
 * It sets up the necessary plugins for the application's AI capabilities.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import next from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    next({
      // We are mounting the API endpoints in /api/genkit.
      // You can change this to a different path if you prefer.
      basePath: '/api/genkit',
    }),
  ],
  // Log all AI model requests and responses.
  logLevel: 'debug',
  // Use a file-based trace store for local development.
  // In a production environment, you would want to use a different trace store.
  // For example, you can use Google Cloud Trace or a different supported store.
  traceStore: 'file',
});


"use server";

import type { PromptTemplate } from "@/lib/prompt-templates";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file for storing shared prompts
const SHARED_PROMPTS_PATH = path.join(process.cwd(), 'src', 'data', 'shared-prompts.json');

// This interface is also used by ExplorePage
export interface SharedPrompt extends PromptTemplate {
  sharedAt: Date;
  authorName?: string;
  // likeCount removed
}

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dirPath = path.dirname(SHARED_PROMPTS_PATH);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Helper function to read prompts from the JSON file
const readPromptsFromFile = (): SharedPrompt[] => {
  ensureDataDirectoryExists();
  try {
    if (fs.existsSync(SHARED_PROMPTS_PATH)) {
      const fileContent = fs.readFileSync(SHARED_PROMPTS_PATH, 'utf-8');
      const prompts = JSON.parse(fileContent) as any[];
      return prompts.map(p => ({
        ...p,
        sharedAt: new Date(p.sharedAt),
        // likeCount initialization removed
      }));
    }
    return [];
  } catch (error) {
    console.error("Error reading shared prompts file:", error);
    return [];
  }
};

// Helper function to write prompts to the JSON file
const writePromptsToFile = (prompts: SharedPrompt[]) => {
  ensureDataDirectoryExists();
  try {
    fs.writeFileSync(SHARED_PROMPTS_PATH, JSON.stringify(prompts, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing shared prompts file:", error);
  }
};

const sharePromptSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  category: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

export async function sharePromptAction(formData: FormData) {
  const rawData = {
    title: formData.get("title") as string,
    prompt: formData.get("prompt") as string,
    category: formData.get("category") as string || "General",
    name: formData.get("name") as string || "",
  };

  const validationResult = sharePromptSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const newSharedPrompt: SharedPrompt = {
    id: Date.now().toString(), 
    title: validationResult.data.title,
    prompt: validationResult.data.prompt,
    description: `Shared by ${validationResult.data.name || "Anonymous"} on ${new Date().toLocaleDateString()}`,
    category: validationResult.data.category,
    authorName: validationResult.data.name || "Anonymous",
    sharedAt: new Date(),
    // likeCount initialization removed
  };

  let currentPrompts = readPromptsFromFile();
  currentPrompts.unshift(newSharedPrompt);
  currentPrompts = currentPrompts.slice(0, 100); 

  writePromptsToFile(currentPrompts);

  revalidatePath("/explore");
  revalidatePath("/share-prompt"); 
  revalidatePath("/admin/manage-prompts"); 

  return { success: true, message: "Prompt shared successfully!" };
}

export async function getSharedPromptsAction(): Promise<SharedPrompt[]> {
  const prompts = readPromptsFromFile();
  return prompts.sort((a, b) => b.sharedAt.getTime() - a.sharedAt.getTime());
}

export async function deleteSharedPromptAction(promptId: string): Promise<{ success: boolean; message: string }> {
  let currentPrompts = readPromptsFromFile();
  const initialLength = currentPrompts.length;
  currentPrompts = currentPrompts.filter(p => p.id !== promptId);

  if (currentPrompts.length === initialLength) {
    return { success: false, message: "Prompt not found or already deleted." };
  }

  writePromptsToFile(currentPrompts);
  revalidatePath("/explore");
  revalidatePath("/admin/manage-prompts"); 

  return { success: true, message: "Prompt deleted successfully." };
}

// togglePromptLikeAction and related logic removed

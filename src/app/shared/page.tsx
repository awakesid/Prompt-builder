
import { getSharedPromptsAction } from "@/actions/promptActions";
import { PromptCard } from "@/components/PromptCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Shared AI Prompts - Prompt Builder",
  description: "Explore AI prompts shared by the Prompt Builder community. Discover user-generated content and get inspired.",
  openGraph: {
    title: "Community Shared AI Prompts - Prompt Builder",
    description: "Browse AI prompts created and shared by our vibrant community.",
  },
  twitter: {
    title: "Community Shared Prompts on Prompt Builder",
    description: "See what AI prompts the Prompt Builder community is sharing.",
  }
};

export default async function SharedPromptsPage() {
  const prompts = await getSharedPromptsAction();

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight">Community Prompts</h1>
        <p className="text-xl text-muted-foreground">
          Discover prompts shared by other users.
        </p>
      </header>

      {prompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No prompts have been shared yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Be the first to share a prompt from the main Forge page!</p>
        </div>
      )}
    </div>
  );
}

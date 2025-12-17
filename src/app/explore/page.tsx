
import { promptTemplates as staticPromptTemplates, type PromptTemplate } from "@/lib/prompt-templates";
import { getSharedPromptsAction, type SharedPrompt } from "@/actions/promptActions";
import { ExplorePageClientContent } from "@/components/ExplorePageClientContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore AI Prompts - Community & Templates",
  description: "Discover and explore a vast collection of AI prompt templates and community-shared prompts. Find inspiration for creative writing, marketing, coding, and more.",
  openGraph: {
    title: "Explore AI Prompts - Community & Templates",
    description: "Browse user-shared AI prompts and official templates on Prompt Builder.",
  },
  twitter: {
    title: "Explore AI Prompts on Prompt Builder",
    description: "Find your next great AI prompt from our community gallery and template library.",
  }
};

// Combined type for consistent handling, PromptTemplate is the base
export interface CombinedPrompt extends PromptTemplate {
  isShared?: boolean; 
  sharedAt?: Date; 
  authorName?: string;
}

export default async function ExplorePage() {
  // Fetch static templates and mark them, prefixing ID for unique key
  const staticTemplates: CombinedPrompt[] = staticPromptTemplates.map(template => ({
    ...template,
    id: `template-${template.id}`,
    isShared: false,
    authorName: "Prompt Builder Team",
  }));

  // Fetch shared prompts and mark them, prefixing ID for unique key
  const sharedApiPrompts: SharedPrompt[] = await getSharedPromptsAction();
  const sharedPrompts: CombinedPrompt[] = sharedApiPrompts.map(prompt => ({
    ...prompt,
    id: `shared-${prompt.id}`,
    isShared: true,
  }));

  // Combine: newest shared prompts are already sorted first from getSharedPromptsAction, then static templates
  const allPrompts: CombinedPrompt[] = [...sharedPrompts, ...staticTemplates];

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight">Explore Prompts</h1>
        <p className="text-xl text-muted-foreground">
          Discover templates and community contributions to spark your creativity.
        </p>
      </header>
      {/* 
        TODO: For Ad Monetization:
        Consider placing ad slot components strategically. 
        For example, an ad unit could be placed above the search bar or interspersed with prompt cards (requires more complex logic for list rendering).
        <AdSlot unitId="explore-page-leaderboard-ad" /> 
      */}
      <ExplorePageClientContent initialPrompts={allPrompts} />
    </div>
  );
}

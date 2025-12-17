
import type { Metadata } from "next";
import { getSharedPromptsAction, type SharedPrompt } from "@/actions/promptActions";
import { promptTemplates as staticPromptTemplates, type PromptTemplate } from "@/lib/prompt-templates";
import type { CombinedPrompt } from "@/app/explore/page"; // Import the CombinedPrompt type
import { ManagePromptsClientContent } from "@/components/ManagePromptsClientContent";
import { LogoutButton } from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Manage Prompts - PromptForge Admin",
  description: "Admin panel to view and manage all prompt templates and community shared prompts.",
};

export default async function ManagePromptsPage() {
  // Fetch static templates
  const staticTemplates: CombinedPrompt[] = staticPromptTemplates.map(template => ({
    ...template,
    id: `template-${template.id}`, // Ensure unique ID for client-side key
    isShared: false, // Mark as not shared (i.e., static and not deletable via this UI)
    authorName: "PromptForge Team",
    // No sharedAt for static templates
  }));

  // Fetch shared prompts
  const sharedApiPrompts: SharedPrompt[] = await getSharedPromptsAction();
  const sharedPrompts: CombinedPrompt[] = sharedApiPrompts.map(prompt => ({
    ...prompt,
    id: `shared-${prompt.id}`, // Ensure unique ID for client-side key
    isShared: true, // Mark as shared and deletable
  }));

  // Combine, showing shared prompts first (newest) then static templates
  const allPrompts: CombinedPrompt[] = [...sharedPrompts, ...staticTemplates];

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div> {/* Spacer */}
          <h1 className="text-4xl font-headline font-bold tracking-tight flex-1 text-center">Manage All Prompts</h1>
          <div className="flex-1 flex justify-end">
            <LogoutButton />
          </div>
        </div>
        <p className="text-xl text-muted-foreground">
          View and delete shared prompts. Static templates are managed via code.
        </p>
      </header>
      <ManagePromptsClientContent initialPrompts={allPrompts} />
    </div>
  );
}

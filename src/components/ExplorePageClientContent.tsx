
"use client";

import type { CombinedPrompt } from "@/app/explore/page"; // Using the combined type from the page
import { PromptCard } from "@/components/PromptCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useMemo } from 'react';

interface ExplorePageClientContentProps {
  initialPrompts: CombinedPrompt[]; 
}

export function ExplorePageClientContent({ initialPrompts }: ExplorePageClientContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrompts = useMemo(() => {
    if (!searchTerm.trim()) return initialPrompts;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return initialPrompts.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(lowerSearchTerm) ||
        (prompt.description && prompt.description.toLowerCase().includes(lowerSearchTerm)) ||
        (prompt.category && prompt.category.toLowerCase().includes(lowerSearchTerm)) ||
        prompt.prompt.toLowerCase().includes(lowerSearchTerm) // Also search in prompt content
    );
  }, [searchTerm, initialPrompts]);

  return (
    <>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search all prompts (e.g., title, category, content)..."
          className="pl-10 w-full max-w-xl mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search prompts"
        />
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No prompts found matching your search. Try a different keyword!
        </p>
      )}
    </>
  );
}

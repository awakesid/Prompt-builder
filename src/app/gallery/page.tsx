
"use client"; 

import { promptTemplates, type PromptTemplate } from "@/lib/prompt-templates";
import { PromptCard } from "@/components/PromptCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useMemo, useEffect } from 'react';

// Metadata export is for server components. 
// For client components, title can be set via useEffect, but layout.tsx provides the base.
// The title defined in layout.tsx with the template '%s | Prompt Builder' will be used.
// This will result in "Prompt Template Gallery | Prompt Builder" if this component doesn't override it.


export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Prompt Template Gallery | Prompt Builder";
  }, []);

  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return promptTemplates;
    return promptTemplates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight">Prompt Template Gallery</h1>
        <p className="text-xl text-muted-foreground">
          Discover and use expertly crafted prompt templates.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search templates (e.g., 'story', 'marketing', 'python')..."
          className="pl-10 w-full max-w-xl mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search prompt templates"
        />
      </div>
      
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <PromptCard key={template.id} prompt={template} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No templates found matching your search. Try a different keyword!
        </p>
      )}
    </div>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PromptTemplate as BasePromptType } from "@/lib/prompt-templates";
import { useToast } from "@/hooks/use-toast";

// Define the expected shape of the prompt object for the card
interface PromptType extends BasePromptType {
  authorName?: string;
  isShared?: boolean;
  // likeCount is removed
}

interface PromptCardProps {
  prompt: PromptType;
  className?: string;
}

export function PromptCard({ prompt, className }: PromptCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast({ title: "Copied!", description: "Prompt copied to clipboard." });
  };

  return (
    <Card className={cn("flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300", className)} data-ai-hint="idea abstract">
      <CardHeader>
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="font-headline text-lg">{prompt.title}</CardTitle>
          {prompt.category && <Badge variant="secondary">{prompt.category}</Badge>}
        </div>
        {prompt.authorName && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <UserCircle className="mr-1.5 h-3.5 w-3.5" />
            <span>{prompt.isShared ? "Shared by:" : "Author:"} {prompt.authorName}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">
          {prompt.prompt}
        </p>
      </CardContent>
      <CardFooter className="mt-auto pt-4 flex items-center justify-start gap-2">
        <Button onClick={handleCopy} className="flex-grow" variant="outline" size="sm">
          <Copy className="mr-2 h-4 w-4" />
          Copy Prompt
        </Button>
      </CardFooter>
    </Card>
  );
}

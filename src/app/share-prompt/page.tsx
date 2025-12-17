
"use client";

import React, { useState, useTransition } from "react"; // Added React import
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Share2, User } from "lucide-react";
import { sharePromptAction } from "@/actions/promptActions";
// import type { Metadata } from 'next'; // Metadata export doesn't work in client components

// If this page were a Server Component, you could add metadata like this:
/*
export const metadata: Metadata = {
  title: "Share Your AI Prompt - Prompt Builder",
  description: "Contribute your unique AI prompts to the Prompt Builder community. Share your creativity and help others discover new ideas.",
   openGraph: {
    title: "Share Your AI Prompt - Prompt Builder",
    description: "Got a great AI prompt? Share it with the Prompt Builder community!",
  },
  twitter: {
    title: "Contribute an AI Prompt to Prompt Builder",
    description: "Share your prompts and help grow the Prompt Builder community.",
  }
};
*/


interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    prompt?: string[];
    category?: string[];
    name?: string[];
  };
}

export default function SharePromptPage() {
  const [title, setTitle] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [formErrors, setFormErrors] = useState<ActionResult['errors']>({});
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  // For Client Components, you can set the document title dynamically if needed, though it's less SEO-effective for initial load.
  React.useEffect(() => {
    document.title = "Share Your AI Prompt - Prompt Builder";
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("prompt", promptContent);
    formData.append("category", category);
    formData.append("name", name);

    startTransition(async () => {
      try {
        const result = await sharePromptAction(formData) as ActionResult;
        if (result.success) {
          toast({ title: "Success!", description: result.message || "Prompt shared successfully!" });
          setTitle("");
          setPromptContent("");
          setCategory("");
          setName("");
          setFormErrors({});
        } else {
          if (result.errors) {
            setFormErrors(result.errors);
          }
          toast({
            title: "Sharing Failed",
            description: result.message || "Could not share prompt. Please check inputs.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Share error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while sharing.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight">Share a Prompt</h1>
        <p className="text-xl text-muted-foreground">
          Contribute your favorite prompt to the community gallery.
        </p>
      </header>
      <Card className="shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">New Shared Prompt</CardTitle>
            <CardDescription>Fill in the details of the prompt you want to share.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="share-name">Your Name (Optional)</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="share-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alex Smith"
                  className="pl-10"
                  aria-invalid={!!formErrors?.name}
                  aria-describedby="share-name-error"
                />
              </div>
              {formErrors?.name && <p id="share-name-error" className="text-sm text-destructive mt-1">{formErrors.name.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="share-title">Title</Label>
              <Input
                id="share-title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Epic Space Opera Opening"
                className="mt-1"
                aria-invalid={!!formErrors?.title}
                aria-describedby="share-title-error"
              />
              {formErrors?.title && <p id="share-title-error" className="text-sm text-destructive mt-1">{formErrors.title.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="share-prompt-content">Prompt</Label>
              <Textarea
                id="share-prompt-content"
                name="prompt"
                value={promptContent}
                onChange={(e) => setPromptContent(e.target.value)}
                placeholder="Enter the full prompt text here..."
                className="min-h-[150px] mt-1"
                rows={8}
                aria-invalid={!!formErrors?.prompt}
                aria-describedby="share-prompt-error"
              />
              {formErrors?.prompt && <p id="share-prompt-error" className="text-sm text-destructive mt-1">{formErrors.prompt.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="share-category">Category (Optional)</Label>
              <Input
                id="share-category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Creative, Technical, Fun"
                className="mt-1"
                aria-invalid={!!formErrors?.category}
                aria-describedby="share-category-error"
              />
              {formErrors?.category && <p id="share-category-error" className="text-sm text-destructive mt-1">{formErrors.category.join(', ')}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending || !title.trim() || !promptContent.trim()} className="w-full sm:w-auto">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
              Share This Prompt
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

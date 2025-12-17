
"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ClipboardCopy, Wand2, Plus, Loader2 } from "lucide-react";
import { beautifyPrompt } from "@/ai/flows/beautify-prompt-flow";
import { expandPrompt } from "@/ai/flows/expand-prompt-flow";
import { FormattedAiResponse } from "./FormattedAiResponse";


export function PromptForm() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  useEffect(() => {
    const templatePrompt = searchParams.get('template');
    if (templatePrompt) {
      setPrompt(decodeURIComponent(templatePrompt));
    }
  }, [searchParams]);

  const copyToClipboard = (text: string | null) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: `Prompt copied to clipboard.` });
    }
  };

  const handleAiAction = (action: 'beautify' | 'expand') => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please enter a prompt before using an AI action.",
      });
      return;
    }

    startTransition(async () => {
      setAiResponse(null);
      try {
        let result;
        if (action === 'beautify') {
          result = await beautifyPrompt({ prompt });
          setAiResponse(result.beautifiedPrompt);
        } else {
          result = await expandPrompt({ prompt });
          setAiResponse(result.expandedPrompt);
        }
        toast({
          title: `Prompt ${action === 'beautify' ? 'Beautified' : 'Expanded'}!`,
          description: "The AI has generated a new version of your prompt.",
        });
      } catch (error) {
        console.error(`${action} error:`, error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: `Could not ${action} the prompt. Please try again.`,
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Craft Your Prompt</CardTitle>
          <CardDescription>
            Enter your prompt below, then copy it or use AI to enhance it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prompt-input" className="mb-1.5 block font-medium">Your Prompt</Label>
            <Textarea
              id="prompt-input"
              placeholder="e.g., A futuristic city skyline at sunset, with flying cars and neon signs..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[200px] mt-1"
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          {/* <Button onClick={() => copyToClipboard(prompt)} disabled={!prompt.trim()} className="w-full sm:w-auto">
            <ClipboardCopy className="mr-2 h-4 w-4" />
            Copy
          </Button> */}
          <Button onClick={() => handleAiAction('beautify')} disabled={isPending || !prompt.trim()} className="w-full sm:w-auto" variant="outline">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Beautify
          </Button>
          <Button onClick={() => handleAiAction('expand')} disabled={isPending || !prompt.trim()} className="w-full sm:w-auto" variant="outline">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Expand
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="shadow-xl h-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI Output</CardTitle>
          {/* <CardDescription>
            The AI-generated version of your prompt will appear here.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="min-h-[200px] text-sm">
          {isPending && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {!isPending && !aiResponse && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Your AI-enhanced prompt will be displayed here.</p>
            </div>
          )}
          {!isPending && aiResponse && (
            <FormattedAiResponse content={aiResponse} />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => copyToClipboard(aiResponse)} disabled={isPending || !aiResponse} className="w-full sm:w-auto">
            <ClipboardCopy className="mr-2 h-4 w-4" />
            Copy AI Prompt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

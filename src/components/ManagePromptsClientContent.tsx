
"use client";

import type { CombinedPrompt } from "@/app/explore/page"; // Use CombinedPrompt
import { deleteSharedPromptAction } from "@/actions/promptActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, UserCircle, Info, CircleHelp } from "lucide-react";
import React, { useState, useTransition } from 'react';
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface ManagePromptsClientContentProps {
  initialPrompts: CombinedPrompt[];
}

export function ManagePromptsClientContent({ initialPrompts }: ManagePromptsClientContentProps) {
  const [prompts, setPrompts] = useState<CombinedPrompt[]>(initialPrompts);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleDeletePrompt = (promptId: string) => {
    // Extract the actual ID if it's prefixed
    const actualId = promptId.startsWith('shared-') ? promptId.substring('shared-'.length) : promptId;

    startTransition(async () => {
      try {
        const result = await deleteSharedPromptAction(actualId);
        if (result.success) {
          toast({ title: "Success!", description: result.message });
          setPrompts(currentPrompts => currentPrompts.filter(p => p.id !== promptId));
        } else {
          toast({
            title: "Deletion Failed",
            description: result.message || "Could not delete prompt.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while deleting.",
          variant: "destructive",
        });
      }
    });
  };

  if (!prompts.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No prompts found to manage.
      </p>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <Card key={prompt.id} className="flex flex-col shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg line-clamp-2">{prompt.title}</CardTitle>
                <Badge variant={prompt.isShared ? "default" : "secondary"} className="ml-2 shrink-0">
                  {prompt.isShared ? "Shared" : "Template"}
                </Badge>
              </div>
              {prompt.authorName && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <UserCircle className="mr-1.5 h-3.5 w-3.5" />
                  <span>{prompt.isShared ? "Shared by:" : "Author:"} {prompt.authorName}</span>
                </div>
              )}
              {prompt.category && (
                  <p className="text-xs text-muted-foreground">Category: {prompt.category}</p>
              )}
              {prompt.sharedAt && prompt.isShared && (
                <p className="text-xs text-muted-foreground">
                  Shared: {new Date(prompt.sharedAt).toLocaleDateString()}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">
                {prompt.prompt}
              </p>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              {prompt.isShared ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full" disabled={isPending}>
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                      Delete Shared
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the shared prompt
                        <span className="font-semibold"> "{prompt.title}"</span>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePrompt(prompt.id)}
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Yes, delete it"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full" disabled>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Template
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="flex items-center"><Info className="mr-2 h-4 w-4" /> Static templates are managed in the codebase.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}

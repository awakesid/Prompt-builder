
"use client" 

import { Suspense } from 'react';
import Link from 'next/link';
import { PromptForm } from "@/components/PromptForm";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Search } from 'lucide-react';
import type { Metadata } from 'next';

// Note: Metadata export only works in Server Components. 
// For client components like this one, you'd set metadata in the parent layout or a Server Component wrapper.
// However, for the primary landing page, it's good practice for it to be a Server Component if possible.
// Since it's currently client, this metadata object is illustrative for if it were a Server Component.
// The actual metadata applied will be from layout.tsx unless this page is refactored.
/*
export const metadata: Metadata = {
  title: "Prompt Builder - Craft, Share & Explore AI Prompts",
  description: "Welcome to Prompt Builder! Your central hub for crafting, beautifying, expanding, and sharing AI prompts. Explore community contributions and supercharge your AI interactions.",
  openGraph: {
    title: "Prompt Builder - Craft, Share & Explore AI Prompts",
    description: "Craft innovative AI prompts, share with the community, and explore a vast library of ideas.",
  },
  twitter: {
    title: "Prompt Builder - AI Prompt Crafting & Sharing Platform",
    description: "Join Prompt Builder to create, refine, and discover amazing AI prompts.",
  }
};
*/

function HomePageContent() {
  return (
    <div className="flex flex-col items-center space-y-12 p-4">
      <header className="text-center space-y-2">
        <h1 className="text-[36px] md:text-5xl font-headline font-bold tracking-tighter">
          Welcome to <span className="text-primary">Prompt Builder</span>
        </h1>
        <p className="text-[15px] md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Craft, beautify, and expand your AI prompts with ease. Unleash the full potential of your ideas.
        </p>
      </header>
      <div className="w-full md:max-w-3xl mx-auto">
        <PromptForm />
      </div>

      <section className="w-full md:max-w-3xl mx-auto mt-12 p-6 bg-card border rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-headline font-semibold mb-3">Explore & Share Your Prompts!</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Dive into our community gallery to explore a wide range of prompts! Found something inspiring or have your own unique idea?
          Contribute to our growing collection and help others spark their creativity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg">
            <Link href="/explore">
              <Search className="mr-2 h-5 w-5" />
              Explore Prompts
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/share-prompt">
              Contribute a Prompt
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      {/* 
        TODO: For Ad Monetization:
        Consider placing ad slot components strategically. 
        For example, an ad unit could be placed here or within list items on explore/gallery pages.
        <AdSlot unitId="homepage-banner-ad" /> 
      */}
    </div>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /> <span className="ml-4 text-xl">Loading Forge...</span></div>}>
      <HomePageContent />
    </Suspense>
  );
}

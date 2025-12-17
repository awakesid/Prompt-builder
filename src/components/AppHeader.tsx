
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, BotMessageSquare, PlusCircle, SearchIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggleButton } from './ThemeToggleButton';

const navItems = [
  { href: "/", label: "Build", icon: BotMessageSquare },
  { href: "/explore", label: "Explore", icon: SearchIcon },
  { href: "/share-prompt", label: "Contribute", icon: PlusCircle },
];

export function AppHeader() {
  const pathname = usePathname();

  const NewLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 60" className="h-6 w-6" role="img" aria-labelledby="promptBuilderLogoTitle">
      <title id="promptBuilderLogoTitle">Prompt Builder Logo</title>
      <defs>
        <linearGradient id="promptForgeLogoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: '0.8' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: '0.6' }} />
        </linearGradient>
      </defs>
      {/* Vertical bar of the P */}
      <rect x="5" y="0" width="15" height="60" fill="url(#promptForgeLogoGrad)" rx="2"/>
      {/* Curved part of the P */}
      <path d="M20 0 
               A 22 22 0 0 1 20 44 
               L 20 32 
               A 10 10 0 0 0 20 12 
               L 20 0 Z" 
            fill="hsl(var(--primary))" />
    </svg>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-auto"> {/* mr-auto pushes nav elements to the right */}
          <NewLogo />
          <span className="font-headline text-xl font-bold">Prompt Builder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "transition-colors hover:text-primary text-sm",
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                <Link href={item.href}>
                  <Icon className="mr-1.5 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
          <ThemeToggleButton />
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center">
          <ThemeToggleButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Sheet Header */}
                <div className="border-b p-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center space-x-2">
                        <NewLogo />
                        <span className="font-headline text-lg font-bold">Prompt Builder</span>
                    </Link>
                  </SheetClose>
                </div>
                {/* Sheet Navigation */}
                <nav className="flex-grow p-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href
                              ? "bg-accent text-accent-foreground" // Active state
                              : "text-foreground" // Default state, text-foreground for better readability
                          )}
                        >
                          <Icon
                            className={cn(
                              "mr-3 h-5 w-5",
                              pathname === item.href
                                ? "text-primary" // Active icon color
                                : "text-muted-foreground" // Default icon color
                            )}
                          />
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


import type {Metadata, Viewport} from 'next';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

// IMPORTANT: Create a .env.local file and set NEXT_PUBLIC_BASE_URL to your production domain
// e.g., NEXT_PUBLIC_BASE_URL=https://www.promptbuilder.com
const siteBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Prompt Builder - Craft, Share & Explore AI Prompts',
    template: '%s | Prompt Builder',
  },
  description: 'Prompt Builder: Your ultimate platform to craft, beautify, expand, share, and explore AI prompts. Unleash creativity and enhance your AI interactions with our comprehensive toolkit.',
  keywords: ['AI prompts', 'prompt engineering', 'prompt generator', 'share prompts', 'explore prompts', 'AI tools', 'creative writing prompts', 'marketing prompts', 'Next.js', 'Genkit'],
  authors: [{ name: 'Prompt Builder Team' }],
  creator: 'Prompt Builder Team',
  publisher: 'Prompt Builder Team',
  openGraph: {
    title: 'Prompt Builder - Craft, Share & Explore AI Prompts',
    description: 'Unleash creativity with Prompt Builder. Craft, share, and discover AI prompts for various needs.',
    url: siteBaseUrl,
    siteName: 'Prompt Builder',
    images: [
      {
        url: `${siteBaseUrl}/og-image.png`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Prompt Builder - AI Prompt Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Builder - Craft, Share & Explore AI Prompts',
    description: 'The best platform for AI prompt creation, sharing, and exploration. Join our community!',
    // siteId: '@YourTwitterHandle', // Replace with your Twitter handle ID
    // creator: '@YourTwitterHandle', // Replace with your Twitter handle
    images: [`${siteBaseUrl}/twitter-image.png`], // Replace with your actual Twitter image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      // You can add a traditional favicon.ico as a fallback if needed:
      // { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' }
    ],
    // apple: '/apple-touch-icon.png', // Add an apple touch icon
  },
  manifest: `${siteBaseUrl}/site.webmanifest`, // Create a web app manifest
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F3FF' }, // Corresponds to --background HSL(251 100% 97.6%)
    { media: '(prefers-color-scheme: dark)', color: '#1E1B2E' }, // Corresponds to dark --background HSL(250 30% 12%)
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* 
          TODO: For Ad Monetization (e.g., Google AdSense):
          1. Sign up for an ad network.
          2. They will provide a script snippet (often includes your publisher ID).
          3. Paste that script here, usually before the closing </head> tag.
          Example: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_ID" crossOrigin="anonymous"></script>
        */}
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background Blur Shapes - now for the full body */}
          <div
            className="absolute -z-10 top-[-10rem] left-[-15rem] w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] animate-gradient-blur-pulse"
            aria-hidden="true"
          />
          <div
            className="absolute -z-10 bottom-[-5rem] right-[-10rem] w-[25rem] h-[25rem] bg-accent/15 rounded-full blur-[80px] animate-gradient-blur-pulse [animation-delay:'-4s']"
            aria-hidden="true"
          />
          <AppHeader />
          <main className="flex-grow container mx-auto py-8">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

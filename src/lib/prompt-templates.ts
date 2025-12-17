
export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  // likeCount removed
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: "1",
    title: "Creative Story Idea",
    description: "Generate a unique story idea based on a few keywords.",
    prompt: "Generate a short story idea (3-5 sentences) combining the following elements: a mysterious old clock, a hidden attic, and a talking cat. The story should have a hint of magic and adventure.",
    category: "Creative Writing",
  },
  {
    id: "2",
    title: "Email Subject Line Generator",
    description: "Craft compelling email subject lines for a marketing campaign.",
    prompt: "Write 5 catchy and persuasive email subject lines for a new product launch. The product is a smart coffee mug that keeps your drink at the perfect temperature. Target audience: busy professionals.",
    category: "Marketing",
  },
  {
    id: "3",
    title: "Code Explainer",
    description: "Explain a complex piece of code in simple terms.",
    prompt: "Explain the following Python code snippet like I'm a beginner: \n\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n```\nFocus on what recursion is and how it's used here.",
    category: "Programming",
  },
  {
    id: "4",
    title: "Recipe Idea",
    description: "Get a recipe idea based on available ingredients.",
    prompt: "I have chicken breast, broccoli, and rice. Suggest a simple and healthy dinner recipe I can make with these ingredients. Provide basic instructions.",
    category: "Cooking",
  },
  {
    id: "5",
    title: "Travel Itinerary",
    description: "Create a basic travel itinerary for a short trip.",
    prompt: "Create a 3-day itinerary for a first-time visitor to Paris, France. Include a mix of famous landmarks, cultural experiences, and food suggestions. Keep it budget-friendly.",
    category: "Travel",
  },
];

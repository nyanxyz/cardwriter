export const LLMs = [
  {
    model: "GPT-3.5",
    provider: "OpenAI",
    url: "https://chat.openai.com/",
    terms: "https://openai.com/policies/terms-of-use",
    version: "2024.02.13",
  },
  {
    model: "GPT-4",
    provider: "OpenAI",
    url: "https://chat.openai.com/",
    terms: "https://openai.com/policies/terms-of-use",
    version: "2024.02.13",
  },
  {
    model: "Gemini",
    provider: "Google",
    url: "https://gemini.google.com/app",
    terms: "https://policies.google.com/terms/generative-ai",
    version: "2024.03.04",
  },
  {
    model: "Claude 3 Sonnet",
    provider: "Anthropic",
    url: "https://claude.ai/chat",
    terms: "https://www.anthropic.com/legal/consumer-terms",
    version: "2024.03.04",
  },
  {
    model: "Claude 3 Opus",
    provider: "Anthropic",
    url: "https://claude.ai/chat",
    terms: "https://www.anthropic.com/legal/consumer-terms",
    version: "2024.03.04",
  },
] as const;

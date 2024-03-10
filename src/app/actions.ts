"use server";

// TODO: Modify the following code to generate a paper card based on the input body.

interface Body {
  steps: string[];
  models: string[];
  disclaimers: string[];
}

export interface PaperCard {
  plain: string;
  latex: string;
  markdown: string;
}

function makeStepPlain(steps: string[]) {
  const stepStr = steps
    .map((step, index) => {
      if (index === 0) {
        return step;
      } else if (index === steps.length - 1) {
        return ` and ${step}`;
      } else {
        return `, ${step}`;
      }
    })
    .join("");

  return `We used machine assistance for the writing of this manuscript, especially in ${stepStr}.`;
}

function makeModelPlain(models: string[]) {
  return `We adopted <ChatGPT 3.5 version xx> provided by {OpenAI} (terms of usage: {url_chatgpt3.5}) and <Gemini version yy> provided by {Google} (terms of usage: {url_gemini}), accessed from {ddmmyy1} to {ddmm2}.`;
}

function makeDisclaimerPlain(disclaimers: string[]) {
  const DESCRIPTIONS_BY_DISCLAIMER: Record<string, string> = {
    Accountability:
      "We own the right of the generated text and is accountable for potential conflicts.",
    Safety:
      "We believe the AI-generated texts included in this paper do not have elements that may give rise to ethical issues.",
    "Academic Integrity":
      "We inspected the texts thoroughly to check for their academic accuracy and plagiarism.",
  };

  return disclaimers
    .map((disclaimer) => DESCRIPTIONS_BY_DISCLAIMER[disclaimer])
    .join(" ");
}

export async function generatePaperCard(body: Body): Promise<PaperCard> {
  const plain = [
    makeStepPlain(body.steps),
    makeModelPlain(body.models),
    makeDisclaimerPlain(body.disclaimers),
  ].join(" ");

  return {
    plain,
    latex: plain,
    markdown: plain,
  };
}

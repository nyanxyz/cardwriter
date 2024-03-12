"use server";

import { LLMs } from "@/constants/llm_dict_240311";

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

class TextGenerator {
  steps: string[];
  models: string[];
  disclaimers: string[];

  constructor(private body: Body) {
    this.steps = body.steps;
    this.models = body.models;
    this.disclaimers = body.disclaimers;
  }

  protected join(texts: string[]) {
    return texts
      .map((text, index) => {
        if (index === 0) {
          return text;
        } else if (index === texts.length - 1) {
          return ` and ${text}`;
        } else {
          return `, ${text}`;
        }
      })
      .join("");
  }

  generateStepText() {
    const joinedSteps = this.join(this.steps);
    return `We used machine assistance for the writing of this manuscript, especially in ${joinedSteps}.`;
  }

  generateModelText(): string {
    throw new Error("Method not implemented.");
  }

  generateDisclaimerText() {
    const DESCRIPTIONS_BY_DISCLAIMER: Record<string, string> = {
      Accountability:
        "We own the right of the generated text and is accountable for potential conflicts.",
      Safety:
        "We believe the AI-generated texts included in this paper do not have elements that may give rise to ethical issues.",
      "Academic Integrity":
        "We also inspected the texts thoroughly to check for their academic accuracy and plagiarism.",
    };

    return this.disclaimers
      .map((disclaimer) => DESCRIPTIONS_BY_DISCLAIMER[disclaimer])
      .join(" ");
  }

  public execute() {
    return [
      this.generateStepText(),
      this.generateModelText(),
      this.generateDisclaimerText(),
    ].join(" ");
  }
}

class PlainTextGenerator extends TextGenerator {
  generateModelText() {
    const models = this.models.map((modelName) => {
      const model = LLMs.find((llm) => llm.model === modelName);
      if (!model) {
        return modelName;
      } else {
        return `${model.model} version ${model.version} provided by ${model.provider} (terms of usage: ${model.terms})`;
      }
    });
    const joinedModels = this.join(models);
    return joinedModels ? `We adopted ${joinedModels}.` : "";
  }
}

class LatexTextGenerator extends TextGenerator {
  generateModelText() {
    const models = this.models.map((modelName) => {
      const model = LLMs.find((llm) => llm.model === modelName);
      if (!model) {
        return modelName;
      } else {
        return `${model.model}\\footnote{\\url{${model.url}}} version ${model.version} provided by ${model.provider} (terms of usage: \\url{${model.terms}})`;
      }
    });
    const joinedModels = this.join(models);
    return joinedModels ? `We adopted ${joinedModels}.` : "";
  }
}

class MarkdownTextGenerator extends TextGenerator {
  generateModelText() {
    const models = this.models.map((modelName) => {
      const model = LLMs.find((llm) => llm.model === modelName);
      if (!model) {
        return modelName;
      } else {
        return `[${model.model}](${model.url}) version ${model.version} provided by ${model.provider} ([terms of usage](${model.terms}))`;
      }
    });
    const joinedModels = this.join(models);
    return joinedModels ? `We adopted ${joinedModels}.` : "";
  }
}

export async function generatePaperCard(body: Body): Promise<PaperCard> {
  const plainGenerator = new PlainTextGenerator(body);
  const latexGenerator = new LatexTextGenerator(body);
  const markdownGenerator = new MarkdownTextGenerator(body);

  return {
    plain: plainGenerator.execute(),
    latex: latexGenerator.execute(),
    markdown: markdownGenerator.execute(),
  };
}

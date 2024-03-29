import { z } from "zod";
import { LLMs } from "@/constants/llm_dict_240311";

export const DIDNT_USE = "No, I didn't use" as const;

export const STEPS = [
  "Key Ideas",
  "Answering",
  "Outline",
  "Original Content",
  "Related Work",
  "Drafting",
  "Editing",
  "Proofreading",
  "Advice",
  DIDNT_USE,
] as const;

export const STEP_DESCRIPTIONS: Partial<
  Record<(typeof STEPS)[number], string>
> = {
  "Key Ideas": "Key ideas and research questions are generated by AI.",
  Answering:
    "Answers to the key ideas and research questions are generated by AI.",
  Outline:
    "The entire paper outline is generated by AI, with key ideas and research questions provided by the author.",
  "Original Content":
    "Some ‘original’ paper content (paragraphs for sections other than the related work section) is generated by AI, with the paper outline provided by the author.",
  "Related Work": "Content for related work section is generated by AI.",
  Drafting:
    "AI is used in writing a draft of the paper, either entirely or partially, when given content that is an `original’ of the author. This may include tasks like translating, paraphrasing, or drafting in a specific person’s writing style.",
  Editing:
    "AI is used to edit the paper, for instance to modify structures and contents originally created by the author.",
  Proofreading:
    "AI is used only to proofread the paper to check for grammar, typos, etc.",
  Advice:
    "AI is used only to give advice on entirely author-generated content (e.g., the author has two different versions of a paper, and could ask AI which is better in terms of readability.)",
} as const;

export const OTHER_MODEL = "Other (please specify)" as const;

export const MODELS = [...LLMs.map((llm) => llm.model), OTHER_MODEL];

export const DISCLAIMERS = [
  "Accountability",
  "Safety",
  "Academic Integrity",
] as const;

export const DESCRIPTIONS_BY_DISCLAIMER = {
  Accountability:
    "I own the right of the generated text and is accountable for potential conflicts",
  Safety:
    "I believe the AI-generated texts included in this paper do not have elements that may give rise to ethical issues",
  "Academic Integrity":
    "I inspected the texts thoroughly to check for their academic accuracy and plagiarism",
} as const;

export const formSchema = z.object({
  steps: z.array(z.enum(STEPS)),
  models: z.array(z.string()),
  modelOther: z.string().optional(),
  disclaimers: z.array(z.enum(DISCLAIMERS)),
});

export type FieldValues = z.infer<typeof formSchema>;

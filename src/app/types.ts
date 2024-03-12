import { z } from "zod";
import { LLMs } from "@/constants/llm_dict_240311";

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
] as const;

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
  steps: z.array(z.enum(STEPS)).min(1),
  models: z.array(z.string()).min(1),
  modelOther: z.string().optional(),
  disclaimers: z.array(z.enum(DISCLAIMERS)).min(1),
});

export type FieldValues = z.infer<typeof formSchema>;

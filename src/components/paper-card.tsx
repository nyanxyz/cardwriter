"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePaperCard } from "@/components/paper-card-provider";
import { PaperCard as TPaperCard } from "@/app/actions";
import { toast } from "sonner";

const FORMAT_OPTIONS = [
  { value: "plain", label: "Plain text" },
  { value: "latex", label: "Latex" },
  { value: "markdown", label: "Markdown" },
] as const;

const radioId = (name: string) => `radio-${name}`;

export function PaperCard() {
  const [format, setFormat] = useState<keyof TPaperCard>("plain");
  const [paperCard] = usePaperCard();

  const [text, setText] = useState<Record<keyof TPaperCard, string>>({
    plain: "",
    latex: "",
    markdown: "",
  });

  useEffect(() => {
    if (!paperCard) return;

    setText({
      plain: paperCard.plain,
      latex: paperCard.latex,
      markdown: paperCard.markdown,
    });
  }, [paperCard]);

  return (
    <Card className={"w-[90vw] md:w-[70vw] lg:w-96"}>
      <CardHeader>
        <CardTitle>PaperCard</CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col space-y-3"}>
        <RadioGroup
          value={format}
          onValueChange={setFormat as any}
          className={"flex flex-wrap gap-x-3 gap-y-1.5"}
        >
          {FORMAT_OPTIONS.map(({ value, label }) => (
            <div key={value} className={"flex items-center gap-x-1.5"}>
              <RadioGroupItem id={radioId(value)} key={value} value={value} />
              <Label htmlFor={radioId(value)} className={"text-sm"}>
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Textarea
          rows={10}
          placeholder={"Results will be displayed here"}
          disabled={!paperCard}
          value={text[format]}
          onChange={(e) => {
            setText((prev) => ({ ...prev, [format]: e.target.value }));
          }}
        />
      </CardContent>

      <CardFooter className={"flex justify-end"}>
        <Button
          size={"sm"}
          disabled={!paperCard}
          onClick={() => {
            if (!paperCard) return;
            navigator.clipboard.writeText(text[format]);

            toast("Copied to clipboard!");
          }}
        >
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}

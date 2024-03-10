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
import { useState } from "react";
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

  return (
    <Card className={"w-96"}>
      <CardHeader>
        <CardTitle>Paper Card</CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col space-y-3"}>
        <RadioGroup
          value={format}
          onValueChange={setFormat as any}
          className={"flex space-x-1.5"}
        >
          {FORMAT_OPTIONS.map(({ value, label }) => (
            <div key={value} className={"flex items-center space-x-1.5"}>
              <RadioGroupItem id={radioId(value)} key={value} value={value} />
              <Label htmlFor={radioId(value)} className={"text-sm"}>
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Textarea
          rows={8}
          placeholder={"Results will be displayed here"}
          disabled={!paperCard}
          value={paperCard ? paperCard[format] : ""}
        />
      </CardContent>

      <CardFooter className={"flex justify-end"}>
        <Button
          size={"sm"}
          disabled={!paperCard}
          onClick={() => {
            if (!paperCard) return;
            navigator.clipboard.writeText(paperCard[format]);

            toast("Copied to clipboard!");
          }}
        >
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}

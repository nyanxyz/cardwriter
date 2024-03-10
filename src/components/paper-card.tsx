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

const FORMAT_OPTIONS = ["Plain text", "Latex", "Markdown"] as const;

const radioId = (name: string) => `radio-${name}`;

export function PaperCard() {
  const [format, setFormat] = useState<string>("Plain text");

  return (
    <Card className={"w-96"}>
      <CardHeader>
        <CardTitle>Paper Card</CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col space-y-3"}>
        <RadioGroup
          value={format}
          onValueChange={setFormat}
          className={"flex space-x-1.5"}
        >
          {FORMAT_OPTIONS.map((option) => (
            <div key={option} className={"flex items-center space-x-1.5"}>
              <RadioGroupItem id={radioId(option)} key={option} value={option}>
                {option}
              </RadioGroupItem>
              <Label htmlFor={radioId(option)} className={"text-sm"}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Textarea
          rows={8}
          placeholder={"Results will be displayed here"}
          disabled={true}
        />
      </CardContent>

      <CardFooter className={"flex justify-end"}>
        <Button size={"sm"}>Copy</Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckboxGroupFormField } from "@/components/checkbox-group-form-field";
import {
  DESCRIPTIONS_BY_DISCLAIMER,
  DISCLAIMERS,
  FieldValues,
  formSchema,
  MODELS,
  STEPS,
} from "@/app/types";

export function PaperCardForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steps: [],
      models: [],
      modelOther: "",
      disclaimers: [],
    },
  });

  function onSubmit(values: FieldValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className={"flex flex-col space-y-8 w-full"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CheckboxGroupFormField
          control={form.control}
          name={"steps"}
          title={
            "1. Check all steps you have practically used generative AI in the writing process:"
          }
        >
          {STEPS.map((step) => (
            <CheckboxGroupFormField.Control key={step} value={step} />
          ))}
        </CheckboxGroupFormField>

        <div className={"flex flex-col space-y-3"}>
          <CheckboxGroupFormField
            control={form.control}
            name={"models"}
            title={
              "2. Choose or enter the generative AI model you have used in the writing:"
            }
          >
            {MODELS.map((model) => (
              <CheckboxGroupFormField.Control key={model} value={model} />
            ))}
          </CheckboxGroupFormField>

          <FormField
            control={form.control}
            name={"modelOther"}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  type={"text"}
                  placeholder={"Model Name"}
                  {...form.register("modelOther", {
                    disabled: !form
                      .watch("models")
                      .includes(MODELS[MODELS.length - 1]),
                  })}
                />
              </FormItem>
            )}
          />
        </div>

        <CheckboxGroupFormField
          control={form.control}
          name={"disclaimers"}
          title={"3. Check all the disclaimers you can provide:"}
        >
          {DISCLAIMERS.map((disclaimer) => (
            <CheckboxGroupFormField.Control key={disclaimer} value={disclaimer}>
              <span className={"font-bold"}>{disclaimer}</span>:{" "}
              {DESCRIPTIONS_BY_DISCLAIMER[disclaimer]}
            </CheckboxGroupFormField.Control>
          ))}
        </CheckboxGroupFormField>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

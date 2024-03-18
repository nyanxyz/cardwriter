import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Children, ReactElement, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import * as Tooltip from "@radix-ui/react-tooltip";

interface CheckboxGroupFormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  title: string;
  children: ReactElement<CheckboxFormControlProps>[];
}

const checkboxId = (name: string) => `checkbox-${name}`;

export function CheckboxGroupFormField<TFieldValues extends FieldValues>({
  control,
  name,
  title,
  children,
}: CheckboxGroupFormFieldProps<TFieldValues>) {
  const items = Children.map(children, (child) => {
    if (child.type !== CheckboxFormControl) {
      throw new Error(
        "CheckboxGroupFormField children must be CheckboxFormControl",
      );
    }

    return child.props;
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <div className={"flex flex-wrap gap-x-3 gap-y-2"}>
            {items.map((item) => {
              const label = (
                <Label
                  htmlFor={checkboxId(item.value)}
                  className={"text-sm font-normal"}
                >
                  {item.children ?? item.value}
                </Label>
              );

              return (
                <FormControl key={item.value}>
                  <div className={"flex space-x-2"}>
                    <Checkbox
                      className={"mt-[0.15rem]"}
                      id={checkboxId(item.value)}
                      value={item.value}
                      disabled={item.disabled}
                      checked={field.value.includes(item.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, item.value]);
                        } else {
                          field.onChange(
                            field.value.filter((s: string) => s !== item.value),
                          );
                        }
                      }}
                    />

                    {item.tooltip ? (
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>{label}</Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className={
                                "text-sm font-medium bg-gray-900 text-white w-64 py-2.5 px-3 rounded-lg shadow-lg"
                              }
                            >
                              {item.tooltip}
                              <Tooltip.Arrow />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    ) : (
                      label
                    )}
                  </div>
                </FormControl>
              );
            })}
          </div>
        </FormItem>
      )}
    />
  );
}

CheckboxGroupFormField.Control = CheckboxFormControl;

interface CheckboxFormControlProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  tooltip?: string;
}

function CheckboxFormControl(props: CheckboxFormControlProps) {
  return null;
}

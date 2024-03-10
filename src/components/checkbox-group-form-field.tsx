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
            {items.map((item) => (
              <FormControl key={item.value}>
                <div className={"flex space-x-2"}>
                  <Checkbox
                    className={"mt-[0.15rem]"}
                    id={checkboxId(item.value)}
                    value={item.value}
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
                  <Label
                    htmlFor={checkboxId(item.value)}
                    className={"text-sm font-normal"}
                  >
                    {item.children ?? item.value}
                  </Label>
                </div>
              </FormControl>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}

CheckboxGroupFormField.Control = CheckboxFormControl;

interface CheckboxFormControlProps {
  value: string;
  children?: ReactNode;
}

function CheckboxFormControl(props: CheckboxFormControlProps) {
  return null;
}

import { Separator } from "@/components/ui/separator";
import { PaperCardForm } from "@/components/paper-card-form";
import { cn } from "@/lib/utils";

export function PaperCardFormSection() {
  return (
    <div
      className={cn(
        "flex-col space-y-8 flex-1 p-8 lg:overflow-y-auto h-fit lg:h-full",
      )}
    >
      <header className={"flex flex-col space-y-1"}>
        <h1 className={"text-3xl font-bold"}>Cardwriter</h1>
        <p>
          Cardwriter is a simple tool for writing and sharing your thoughts.
        </p>
      </header>

      <Separator />

      <PaperCardForm />
    </div>
  );
}

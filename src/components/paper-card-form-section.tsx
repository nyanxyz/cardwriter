import { Separator } from "@/components/ui/separator";
import { PaperCardForm } from "@/components/paper-card-form";

export function PaperCardFormSection() {
  return (
    <div className={"flex flex-col space-y-8 flex-1 p-8 overflow-y-auto"}>
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

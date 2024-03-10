import { PaperCard } from "@/components/paper-card";
import { cn } from "@/lib/utils";
import { usePaperCard } from "@/components/paper-card-provider";
import { Button } from "@/components/ui/button";

export function PaperCardSection() {
  const [paperCard, setPaperCard] = usePaperCard();

  return (
    <div
      className={cn(
        "bg-gray-100 py-8 lg:w-[480px] flex-col justify-center items-center",
        {
          "flex w-full": paperCard,
          "lg:flex hidden": !paperCard,
        },
      )}
    >
      <PaperCard />

      <Button
        className={"lg:hidden underline"}
        variant={"link"}
        onClick={() => {
          setPaperCard(undefined);
        }}
      >
        Back to form
      </Button>
    </div>
  );
}

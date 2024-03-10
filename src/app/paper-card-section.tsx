import { PaperCard } from "@/app/paper-card";

export function PaperCardSection() {
  return (
    <div
      className={
        "hidden lg:flex bg-gray-100 py-8 px-12 flex-col justify-center"
      }
    >
      <PaperCard />
    </div>
  );
}

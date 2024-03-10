import { PaperCardSection } from "@/app/paper-card-section";
import { PaperCardFormSection } from "@/app/paper-card-form-section";

export default function Home() {
  return (
    <div className={"flex h-full"}>
      <PaperCardFormSection />
      <PaperCardSection />
    </div>
  );
}

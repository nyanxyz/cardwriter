import { PaperCardSection } from "@/components/paper-card-section";
import { PaperCardFormSection } from "@/components/paper-card-form-section";

export default function Home() {
  return (
    <div className={"flex h-full"}>
      <PaperCardFormSection />
      <PaperCardSection />
    </div>
  );
}

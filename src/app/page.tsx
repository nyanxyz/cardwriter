"use client";

import { PaperCardSection } from "@/components/paper-card-section";
import { PaperCardFormSection } from "@/components/paper-card-form-section";
import { PaperCardProvider } from "@/components/paper-card-provider";

export default function Home() {
  return (
    <PaperCardProvider>
      <div className={"flex h-full"}>
        <PaperCardFormSection />
        <PaperCardSection />
      </div>
    </PaperCardProvider>
  );
}

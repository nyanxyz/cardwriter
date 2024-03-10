import { createContext, ReactNode, useContext, useState } from "react";
import { PaperCard } from "@/app/actions";

const PaperCardContext = createContext<
  ReturnType<typeof useState<PaperCard>> | undefined
>(undefined);

export function usePaperCard() {
  const context = useContext(PaperCardContext);

  if (!context) {
    throw new Error("usePaperCard must be used within a PaperCardProvider");
  }

  return context;
}

interface PaperCardProviderProps {
  children: ReactNode;
}

export function PaperCardProvider({ children }: PaperCardProviderProps) {
  const paperCard = useState<PaperCard>();

  return (
    <PaperCardContext.Provider value={paperCard}>
      {children}
    </PaperCardContext.Provider>
  );
}

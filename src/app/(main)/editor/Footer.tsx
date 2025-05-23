import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (setp: string) => void;
}

export default function Footer({ currentStep, setCurrentStep }: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;
  return (
    <footer className="w-full border-t px-3 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* buttons for going to the previous and next steps. */}
          <Button
            variant={"secondary"}
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
          >
            Next Step
          </Button>

        </div>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"} asChild>
            <Link href={"/resumes"}>Close</Link>
          </Button>
          <p className="text-muted-foreground">Saving...</p>
        </div>
      </div>
    </footer>
  );
}

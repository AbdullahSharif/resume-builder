import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validators";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  // the cn function replaces the class names in the first argument, with the class names supplied in the 2nd argument.
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
    >
      <h1 className="p-6 text-3xl font-bold">Dummy heading for now</h1>
    </div>
  );
}

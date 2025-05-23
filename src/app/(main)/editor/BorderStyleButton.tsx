import { Button } from "@/components/ui/button";
import { Squircle } from "lucide-react";

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onchange,
}: BorderStyleButtonProps) {
  function handleClick() {}

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      title="Change border style"
      onClick={handleClick}
    >
      <Squircle className="size-5" />
    </Button>
  );
}

import { Form } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({ ...resumeData, ...values });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-muted-foreground">
          Tell us about your work experience
        </p>
      </div>

      <Form {...form}>
        <form></form>
      </Form>
    </div>
  );
}

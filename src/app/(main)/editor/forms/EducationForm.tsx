import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { GripHorizontal } from "lucide-react";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
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

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-muted-foreground">Add your education details</p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            />
          ))}

          <div className="flex items-center justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}
function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="space-y-5 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Education {index + 1}</h3>
        <GripHorizontal className="cursor-grab text-muted-foreground" />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you are
        currently studying here.
      </FormDescription>

      <Button type="button" variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}

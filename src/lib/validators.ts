// defining the schemas for the forms. Defining it here so that we can use
// them at the front-end and back-end as well.
import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const generalInfoSchema = z.object({
  // can be either undefined or empty string.
  title: optionalString,
  desciption: optionalString,
});

// now we create a type from the above schema.

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "File must be an image",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB.",
    ),
  firstName: optionalString,
  lastName: optionalString,
  email: z.string().email().or(z.literal("")),
  phone: optionalString,
  country: optionalString,
  city: optionalString,
  jobTitle: optionalString,
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null; // after storing the image, it will be a string url.
};

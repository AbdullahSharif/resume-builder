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

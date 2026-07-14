// lib/validations/job.ts
import { z } from "zod";

export const jobSchema = z
  .object({
    title: z.string().min(3, "Title kam se kam 3 characters ka ho").max(100),
    company: z.string().min(2, "Company name required").max(100),
    location: z.string().min(2, "Location required").max(100),
    jobType: z.enum(["full-time", "part-time", "contract", "internship", "remote"]),
    salaryMin: z.coerce.number().min(0).optional(),
    salaryMax: z.coerce.number().min(0).optional(),
    description: z.string().min(50, "Description kam se kam 50 characters ka ho"),
    requirements: z.string().min(20, "Requirements kam se kam 20 characters ke hon"),
  })
  .refine(
    (data) =>
      !data.salaryMin || !data.salaryMax || data.salaryMax >= data.salaryMin,
    {
      message: "Max salary, min salary se kam nahi ho sakti",
      path: ["salaryMax"],
    }
  );

export type JobFormValues = z.infer<typeof jobSchema>;
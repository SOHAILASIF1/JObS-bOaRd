import { z } from "zod";

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID required hai"),
  resumeLink: z.string().url("Valid resume link (URL) dein"),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
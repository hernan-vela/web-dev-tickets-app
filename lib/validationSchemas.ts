import { z } from 'zod';

/** Arguments inside 'min' character define the error message
   * if the min condition is not met. This arg is optional
   */
export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Whaaat, no!')
});


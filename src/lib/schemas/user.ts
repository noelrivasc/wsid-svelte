import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  emailVerified: z.number(),
  image: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;

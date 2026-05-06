import { z } from 'zod';

export const testBoxPropsSchema = z.object({
	color: z.enum(['red', 'blue']),
	text: z.string().min(1, 'text must not be empty')
});

export type TestBoxProps = z.infer<typeof testBoxPropsSchema>;

import { z } from 'zod';

export function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const taskSchema = z.object({
    title: z.string().trim()
        .min(3, "Title must be at least 3 characters long.")
        .max(30, "Title cannot exceed 30 characters."),
    description: z.string().trim()
        .min(3, "Description must be at least 3 characters long.")
        .max(100, "Description cannot exceed 100 characters."),
    priority: z.enum(["low", "medium", "high"], {
        errorMap: () => ({ message: "Please select a valid priority." }),
    }),
});

export type TaskFormInput = z.infer<typeof taskSchema>;
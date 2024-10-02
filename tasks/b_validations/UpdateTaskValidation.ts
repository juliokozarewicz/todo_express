import { z } from 'zod';

export const UpdateTaskValidation = z.object({

    updateId: z.string()
        .uuid(),

    taskName: z.string()
        .min(1, "is required")
        .max(255, "contains too many characters")
        .regex(
            /^[^<>&'"/]+$/,
            "contains disallowed characters"
        ),

    category: z.string()
        .min(1, "is required")
        .max(255, "contains too many characters")
        .regex(
            /^[^<>&'"/]+$/,
            "contains disallowed characters"
        ),

    description: z.string()
        .min(1, "is required")
        .max(500, "contains too many characters")
        .regex(
            /^[^<>&'"/]+$/,
            "contains disallowed characters"
        ),

    dueDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "must be in the format YYYY-MM-DD")
        .refine(date => !isNaN(Date.parse(date)), {
            message: "must be a valid date",
        })
        .transform(date => new Date(date)),

    statusName: z.string()
        .min(1, "is required")
        .max(500, "contains too many characters")
        .regex(
            /^[^<>&'"/]+$/,
            "contains disallowed characters"
        ),

});

// types
export type UpdateTaskValidationType = z.infer<typeof UpdateTaskValidation>;

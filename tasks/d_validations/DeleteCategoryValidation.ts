import { z } from 'zod'

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const DeleteCategoryValidation = z.object({
    categoryId: z.string()
        .min(1, "categoryId is required")
        .regex(uuidRegex, "invalid UUID format"),
});

// types
export type DeleteCategoryValidationType = z.infer<typeof DeleteCategoryValidation>
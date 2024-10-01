// d_validations/CreateCategoryValidation.ts
import { z } from 'zod'

export const CreateCategoryValidation = z.object({
    categoryName: z.string()
        .min(1, "categoryName is required")
        .max(255, "categoryName contains too many characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "categoryName must only contain alphanumeric characters and spaces"),
});

// types
export type CreateCategoryValidationType = z.infer<typeof CreateCategoryValidation>
import { z } from 'astro:schema';

export const titleValidation = z.object({
    title: z.string().trim().min(4),
})

export const updateValidation = z.object({
    id: z?.number().min(1),
    title: z?.string().min(3),
    isDone: z.boolean(),
})

export const idValidation = z.object({
    id: z.number().min(1),
})
import { z } from 'zod';
import { Types } from 'mongoose';

// A reusable schema for validating MongoDB ObjectIds
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid MongoDB ObjectId",
});

export const createTourTypesZodSchema = z.object({
  name : z.string({
    required_error : "Name is required",
  })
})

// Zod schema for creating a new tour
export const createTourZodSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(1, "Title cannot be empty"),

  slug: z.string({
    required_error: "Slug is required",
  }).min(1, "Slug cannot be empty"),

  description: z.string().optional(),
  
  images: z.array(z.string()).optional().default([]),

  location: z.string().optional(),
  
  // Assuming 'constForm' is a typo for 'costFrom' or similar
  costFrom: z.number().positive("Cost must be a positive number").optional(),

  startDate: z.coerce.date().optional(), // z.coerce.date() can convert string to Date
  endDate: z.coerce.date().optional(),

  included: z.array(z.string()).optional().default([]),
  excluded: z.array(z.string()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  tourPlan: z.array(z.string()).optional().default([]),

  maxGuest: z.number().int().positive("Max guests must be a positive integer").optional(),
  minAge: z.number().int().positive("Minimum age must be a positive integer").optional(),

  division: objectIdSchema, // Reusing the ObjectId validator

  tourType: z.string().optional(),
});

// Zod schema for updating a tour (all fields are optional)
export const updateTourZodSchema = createTourZodSchema.partial();

// Infer TypeScript types from the Zod schemas for type safety
// export type CreateTourInput = z.infer<typeof createTourSchema>;
// export type UpdateTourInput = z.infer<typeof updateTourSchema>;

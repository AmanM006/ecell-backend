import { z } from "zod";

import { ALLOWED_COLLEGES } from "@/api/submission/collegeConfig";

export const YearOfStudySchema = z
  .enum(["1", "2", "3", "4", "5"])
  .transform(Number);

export const CollegeSchema = z.enum(ALLOWED_COLLEGES, {
  error: "Please select a valid college from the list",
});

export const TeamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Team member name is required")
    .max(100, "Name cannot exceed 100 characters"),
  yearOfStudy: YearOfStudySchema,
});

export const SupportingFilesSchema = z.object({
  pitchDeckUrl: z
    .url("Pitch deck URL must be a valid URL")
    .max(500, "URL cannot exceed 500 characters"),
  pitchVideoUrl: z
    .url("Pitch video URL must be a valid URL")
    .max(500, "URL cannot exceed 500 characters"),
});

export const CreateSubmissionSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(1, "Team name is required")
    .max(100, "Team name cannot exceed 100 characters"),

  teamLeaderName: z
    .string()
    .trim()
    .min(1, "Team leader name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .email("Invalid email format")
    .toLowerCase()
    .max(255, "Email cannot exceed 255 characters"),

  contactNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
    .or(
      z
        .string()
        .regex(/^\+[0-9]{1,3}[0-9]{10}$/, "Invalid contact number format"),
    ),

  yearOfStudy: YearOfStudySchema,

  college: CollegeSchema,

  teamMembers: z
    .array(TeamMemberSchema)
    .max(4, "Maximum 4 team members allowed (excluding team leader)")
    .default([]),

  supportingFiles: SupportingFilesSchema,
});

export const GetSubmissionByIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
});

export const GetSubmissionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  teamName: z.string().trim().optional(),
  email: z.email().optional(),
  yearOfStudy: YearOfStudySchema.optional(),
  college: CollegeSchema.optional(),
  sortBy: z
    .enum(["createdAt", "teamName", "email", "college"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateSubmissionDTO = z.infer<typeof CreateSubmissionSchema>;
export type GetSubmissionByIdDTO = z.infer<typeof GetSubmissionByIdSchema>;
export type GetSubmissionsQueryDTO = z.infer<typeof GetSubmissionsQuerySchema>;
export type TeamMemberDTO = z.infer<typeof TeamMemberSchema>;
export type SupportingFilesDTO = z.infer<typeof SupportingFilesSchema>;

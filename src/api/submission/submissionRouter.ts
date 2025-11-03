import { Router } from "express";
import { z } from "zod";

import { createSubmission } from "@/api/submission/submissionController";
import { validateRequest } from "@/common/utils/requestValidation";
import { CreateSubmissionSchema } from "@/api/submission/submissionDto";

export const submissionRouter = Router();

submissionRouter.post(
  "/",
  validateRequest(z.object({ body: CreateSubmissionSchema })),
  createSubmission,
);

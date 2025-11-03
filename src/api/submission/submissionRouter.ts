import { Router } from "express";

import { validateRequest } from "@/common/utils/requestValidation";
import { createSubmission } from "@/api/submission/submissionController";
import { CreateSubmissionSchema } from "@/api/submission/submissionDto";

export const submissionRouter = Router();

submissionRouter.post(
  "/",
  validateRequest({ body: CreateSubmissionSchema }),
  createSubmission,
);

import { Request, RequestHandler } from "express";
import status from "http-status";

import { HttpException } from "@/common/models/httpException";
import { CreateSubmissionDTO } from "@/api/submission/submissionDto";
import { SubmissionService } from "@/api/submission/submissionService";

export const createSubmission: RequestHandler = async (
  req: Request<any, any, CreateSubmissionDTO>,
  res,
) => {
  const validatedData = req.body;

  if (
    await SubmissionService.isUnique(
      validatedData.email,
      validatedData.teamName,
    )
  ) {
    throw new HttpException(
      status.CONFLICT,
      "A submission with this email or team name already exists",
    );
  }

  await SubmissionService.save(validatedData);

  return res.status(status.CREATED).json({
    success: true,
    message: "Submission created successfully",
    payload: null,
  });
};

import { Request, RequestHandler } from "express";
import status from "http-status";

import { HttpException } from "@/common/models/httpException";
import {
  CreateSubmissionDTO,
  GetSubmissionByIdDTO,
  GetSubmissionsQueryDTO,
} from "@/api/submission/submissionDto";
import { SubmissionService } from "@/api/submission/submissionService";

export const createSubmission: RequestHandler = async (
  req: Request<unknown, unknown, CreateSubmissionDTO>,
  res,
  next,
) => {
  try {
    const validatedData = req.body;

    if (
      !(await SubmissionService.isUnique(
        validatedData.email,
        validatedData.teamName,
      ))
    ) {
      throw new HttpException(
        status.CONFLICT,
        "A submission with this email or team name already exists",
      );
    }

    await SubmissionService.create(validatedData);

    return res.status(status.CREATED).json({
      success: true,
      message: "Submission created successfully",
      payload: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubmissions: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetSubmissionsQueryDTO
> = async (req, res, next) => {
  try {
    const queryParams = req.query;

    const result = await SubmissionService.getAll(queryParams);

    return res.status(status.OK).json({
      success: true,
      message: "Submissions retrieved successfully",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmissionById: RequestHandler<GetSubmissionByIdDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;

    const submission = await SubmissionService.getById(id);

    if (!submission) {
      throw new HttpException(status.NOT_FOUND, "Submission not found");
    }

    return res.status(status.OK).json({
      success: true,
      message: "Submission retrieved successfully",
      payload: submission,
    });
  } catch (error) {
    next(error);
  }
};

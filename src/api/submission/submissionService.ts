import { Submission } from "@/api/submission/submissionModel";
import {
  type CreateSubmissionDTO,
  type GetSubmissionsQueryDTO,
} from "@/api/submission/submissionDto";

export const SubmissionService = {
  async isUnique(email: string, teamName: string): Promise<boolean> {
    const existingSubmission = await Submission.findOne({
      $or: [{ email }, { teamName }],
    });

    return !existingSubmission;
  },

  async create(submissionData: CreateSubmissionDTO) {
    const submission = new Submission(submissionData);
    await submission.save();
  },

  async getAll(queryParams: GetSubmissionsQueryDTO) {
    const {
      page,
      limit,
      teamName,
      email,
      yearOfStudy,
      college,
      sortBy,
      sortOrder,
    } = queryParams;

    const filter: Record<string, unknown> = {};

    if (teamName) {
      filter.teamName = { $regex: teamName, $options: "i" };
    }

    if (email) {
      filter.email = email.toLowerCase();
    }

    if (yearOfStudy) {
      filter.yearOfStudy = yearOfStudy;
    }

    if (college) {
      filter.college = college;
    }

    const skip = (page - 1) * limit;

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const [submissions, total] = await Promise.all([
      Submission.find(filter).sort(sort).skip(skip).limit(limit).lean().exec(),
      Submission.countDocuments(filter),
    ]);

    return {
      submissions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  },

  async getById(id: string) {
    return await Submission.findById(id).lean().exec();
  },
};

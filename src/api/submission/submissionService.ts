import { Submission } from "@/api/submission/submissionModel";
import { type CreateSubmissionDTO } from "@/api/submission/submissionDto";

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
};

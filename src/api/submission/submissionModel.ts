import { Document, model, Schema } from "mongoose";

import { ALLOWED_COLLEGES } from "@/api/submission/collegeConfig";

enum YearOfStudy {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
}

interface ITeamMember {
  name: string;
  yearOfStudy: YearOfStudy;
}

interface IIdeaDetails {
  problemStatement: string;
  proposedSolution: string;
  startupDescription: string;
  targetAudience: string;
  uniqueValueProposition: string;
  scalingPlan: string;
  marketingChannels: string;
  businessModel: string;
}

interface ISupportingFiles {
  pitchDeckUrl: string;
  pitchVideoUrl: string;
}

// ---- MAIN Document type ----
interface ISubmission extends Document {
  teamName: string;
  teamLeaderName: string;
  email: string;
  contactNumber: string;
  college: string;
  yearOfStudy: YearOfStudy;

  teamMembers: ITeamMember[];

  ideaDetails: IIdeaDetails;

  supportingFiles: ISupportingFiles;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfStudy: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { _id: false },
);

const ideaDetailsSchema = new Schema<IIdeaDetails>(
  {
    problemStatement: {
      type: String,
      required: true,
      trim: true,
    },
    proposedSolution: {
      type: String,
      required: true,
      trim: true,
    },
    startupDescription: {
      type: String,
      required: true,
      trim: true,
    },
    targetAudience: {
      type: String,
      required: true,
      trim: true,
    },
    uniqueValueProposition: {
      type: String,
      required: true,
      trim: true,
    },
    scalingPlan: {
      type: String,
      required: true,
      trim: true,
    },
    marketingChannels: {
      type: String,
      required: true,
      trim: true,
    },
    businessModel: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const supportingFilesSchema = new Schema<ISupportingFiles>(
  {
    pitchDeckUrl: {
      type: String,
      required: true,
      trim: true,
    },
    pitchVideoUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

// ---- MAIN Schema type ----
const submissionSchema = new Schema<ISubmission>(
  {
    // Personal Details
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      maxLength: [100, "Team name cannot exceed 100 characters"],
    },
    teamLeaderName: {
      type: String,
      required: [true, "Leader name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ALLOWED_COLLEGES,
        message: "Invalid college name selected",
      },
    },
    yearOfStudy: {
      type: Number,
      required: [true, "Year of Study is required"],
      enum: {
        values: [1, 2, 3, 4, 5],
        message: "Year of Study must be between 1 and 5",
      },
    },

    teamMembers: {
      type: [teamMemberSchema],
      default: [],
      validate: {
        validator: function (members: ITeamMember[]) {
          return members.length <= 4;
        },
        message: "Maximum 4 team members allowed (excluding team leader)",
      },
    },

    ideaDetails: {
      type: ideaDetailsSchema,
      required: [true, "Idea details are required"],
    },

    supportingFiles: {
      type: supportingFilesSchema,
      required: [true, "Supporting files are required"],
    },
  },
  { timestamps: true },
);

submissionSchema.index({ email: 1 });
submissionSchema.index({ teamName: 1 });
submissionSchema.index({ college: 1 });
submissionSchema.index({ createdAt: -1 });

submissionSchema.virtual("totalTeamSize").get(function () {
  return this.teamMembers.length + 1;
});

export const Submission = model<ISubmission>("submission", submissionSchema);

export {
  type ISubmission,
  type ITeamMember,
  type IIdeaDetails,
  type ISupportingFiles,
  YearOfStudy,
};

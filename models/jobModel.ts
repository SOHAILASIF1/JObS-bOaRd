import { model, models, Schema } from "mongoose";

const jobModel = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      required: true,
    },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Job || model("Job", jobModel);
import { validationResult } from "express-validator";
import _ from "lodash";
import { CustomError, CustomValidationError } from "../utils/custom.error.mjs";
import Job from "../models/job.model.mjs";

const jobController = {};

/*
GET /api/jobs
Access: all
Desc: get all jobs to apply
*/
jobController.getAllJobs = async (req, res, next) => {
  try {
    const users = await Job.find()
    res.json(users)
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
POST /api/jobs
Access: recruiter
Desc: create a job
*/
jobController.createAJob = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomValidationError(errors.array(), 400));
  }

  const body = _.pick(req.body, ["title", "description", "skills", "location", "salary", "deadline"]);

  try {
    const job = new Job(body)
    job.recruiterId = req.user._id
    await job.save()

    res.status(201).json({message: "job created successfully"})
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
POST /api/jobs
Access: candidate
Desc: apply for a job
*/
jobController.applyForJob = async (req, res, next) => {
  res.json({ message: "job applied" });
};

export default jobController;
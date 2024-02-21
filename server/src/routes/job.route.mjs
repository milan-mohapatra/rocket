import express from "express";
import { checkSchema } from "express-validator"

import jobController from "../controllers/job.controller.mjs";
import { authenticateUser, authorizeUser } from "../middlewares/auth.mjs";
import { ROLES } from "../utils/constant.mjs";
import jobValidation from "../validations/job.validation.mjs";

const route = express.Router();

route.route("/").get(jobController.getAllJobs);
route.use(authenticateUser);
route.route("/my").get(authorizeUser([ROLES.RECRUITER]), jobController.getMyJobs);
route.route("/").post(authorizeUser([ROLES.RECRUITER]), checkSchema(jobValidation), jobController.createAJob);
route.route("/apply").post(authorizeUser([ROLES.CANDIDATE]), jobController.applyForJob);

export default route;

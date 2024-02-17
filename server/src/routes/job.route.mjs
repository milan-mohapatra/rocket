import express from "express";
import { checkSchema } from "express-validator"

import jobController from "../controllers/job.controller.mjs";
import { authenticateUser, authorizeUser } from "../middlewares/auth.mjs";
import { ROLES } from "../utils/constant.mjs";
import jobValidation from "../validations/job.validation.mjs";

const route = express.Router();

route.use(authenticateUser);
route.route("/").get(jobController.getAllJobs);
route.route("/").post(authorizeUser([ROLES.RECRUITER]), checkSchema(jobValidation), jobController.createAJob);
route.route("/apply").post(authorizeUser([ROLES.CANDIDATE]), jobController.applyForJob);

export default route;

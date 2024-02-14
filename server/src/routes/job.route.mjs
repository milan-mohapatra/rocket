import express from "express";
import jobController from "../controllers/job.controller.mjs";
import { authenticateUser, authorizeUser } from "../middlewares/auth.mjs";
import { ROLES } from "../utils/constant.mjs";
const jobRoute = express.Router();

jobRoute.use(authenticateUser);
jobRoute.route("/").get(authorizeUser([ROLES.CANDIDATE]), jobController.getAllJobs);
jobRoute.route("/").post(authorizeUser([ROLES.RECRUITER]), jobController.createAJob);
jobRoute.route("/").post(authorizeUser([ROLES.CANDIDATE]), jobController.applyForJob);

export default jobRoute;

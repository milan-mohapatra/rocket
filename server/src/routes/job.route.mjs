import express from "express";
import jobController from "../controllers/job.controller.mjs";
import { authenticateUser, authorizeUser } from "../middlewares/auth.mjs";
import { ROLES } from "../utils/constant.mjs";
const route = express.Router();

route.use(authenticateUser);
route.route("/").get(authorizeUser([ROLES.CANDIDATE]), jobController.getAllJobs);
route.route("/").post(authorizeUser([ROLES.RECRUITER]), jobController.createAJob);
route.route("/").post(authorizeUser([ROLES.CANDIDATE]), jobController.applyForJob);

export default route;

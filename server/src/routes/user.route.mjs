import express from "express"
import { checkSchema } from "express-validator"
import userController from "../controllers/user.controller.mjs"
import { registrationSchema } from "../validations/user.validation.mjs"

const route = express.Router()

route.route("/register").post(checkSchema(registrationSchema), userController.register)

export default route
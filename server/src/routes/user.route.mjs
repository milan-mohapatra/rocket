import express from "express"
import { checkSchema } from "express-validator"
import userController from "../controllers/user.controller.mjs"
import { loginSchema, registrationSchema } from "../validations/user.validation.mjs"

const route = express.Router()

route.route("/register").post(checkSchema(registrationSchema), userController.register)
route.route("/login").post(checkSchema(loginSchema), userController.login)

export default route
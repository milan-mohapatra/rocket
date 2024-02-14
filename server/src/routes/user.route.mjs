import express from "express"
import { checkSchema } from "express-validator"
import userController from "../controllers/user.controller.mjs"
import { loginSchema, registrationSchema } from "../validations/user.validation.mjs"
import { authenticateUser } from "../middlewares/auth.mjs"

const route = express.Router()

route.route("/register").post(checkSchema(registrationSchema), userController.register)
route.route("/login").post(checkSchema(loginSchema), userController.login)
route.route("/account").get(authenticateUser ,userController.account)

export default route
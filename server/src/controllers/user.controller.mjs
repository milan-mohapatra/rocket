import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
import { validationResult } from "express-validator";
import { CustomError, CustomValidationError } from "../utils/custom.error.mjs";

const userController = {};

/*
POST /api/users/register
Access: public
Desc: Register an user
*/
userController.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomValidationError(errors.array(), 400))
  }

  const body = _.pick(req.body, ["username", "email", "password", "role"]);

  try {
    const user = new User(body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    await user.save();

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
POST /api/users/login
Access: public
Desc: User login
*/
userController.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomValidationError(errors.array(), 400))
  }
  
  const body = req.body;

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return next(new CustomError("invalid email or password", 404));
    }

    const checkValidPassword = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!checkValidPassword) {
      return next(new CustomError("invalid email or password", 404));
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
GET /api/users/account
Access: user
Desc: User account info
*/
userController.account = async (req, res, next) => {
  const user = req.user

  try {
    if(user.role === "recruiter") {
      const userInfo = await User.findById(user._id).select(["_id", "username", "email", ""])
      res.json(userInfo)
    }

    const userInfo = await User.findById(user._id).select(["_id", "username", "email"])
    res.json(userInfo)
  } catch (err) {
    next(new CustomError(err.message))
  }
}

export default userController;

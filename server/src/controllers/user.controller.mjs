import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/custom.error.mjs";

const userController = {};

/*
POST /api/users/register
Access: public
Desc: Register an user
*/
userController.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = _.pick(req.body, ["username", "email", "password"]);

  try {
    const user = new User(body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
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
    // return next(new CustomError(errors.array().at(0).msg, 400))
    return res.status(400).json({ errors: errors.array() });
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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

export default userController;

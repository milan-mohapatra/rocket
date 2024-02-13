import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/custom.error.mjs";

const userController = {};

userController.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const body = _.pick(req.body, ["username", "email", "password"]);

  try {
    const user = new User(body);

    // encrypting password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    await users.save();

    // generating token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({token});
  } catch (err) {
    next(new CustomError(err.message))
  }
};

export default userController;

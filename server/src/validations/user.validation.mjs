import User from "../models/user.model.mjs"

export const registrationSchema = {
    username: {
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: "valid username required"
        },
        custom: {
            options: async (username) => {
                const user = await User.findOne({username})

                if(user) {
                    throw new Error("username is taken")
                }
            }
        }
    },
    email: {
        escape: true,
        trim: true,
        normalizeEmail: true,
        isEmail: {
            errorMessage: "valid email required"
        },
        custom: {
            options: async (email) => {
                const user = await User.findOne({email})

                if(user) {
                    throw new Error("email is already in use")
                }
            }
        }
    },
    password: {
        escape: true,
        isStrongPassword: {
            errorMessage: "minimum 8 charter, 1 lowercase, 1 uppercase, 1 number, 1 special character"
        }
    }
}

export const loginSchema = {
    email: {
        escape: true,
        trim: true,
        normalizeEmail: true,
        isEmail: {
            errorMessage: "valid email required"
        }
    },
    password: {
        escape: true,
        isStrongPassword: {
            errorMessage: "minimum 8 charter, 1 lowercase, 1 uppercase, 1 number, 1 special character"
        }
    }
}
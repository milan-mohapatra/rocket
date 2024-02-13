import User from "../models/user.model.mjs"

export const registrationSchema = {
    username: {
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
        isStrongPassword: {
            errorMessage: "minimum 8 charter, 1 lowercase, 1 uppercase, 1 number, 1 special character"
        }
    }
}

export const loginSchema = {
    email: {
        trim: true,
        normalizeEmail: true,
        isEmail: {
            errorMessage: "valid email required"
        }
    },
    password: {
        isStrongPassword: {
            errorMessage: "minimum 8 charter, 1 lowercase, 1 uppercase, 1 number, 1 special character"
        }
    }
}
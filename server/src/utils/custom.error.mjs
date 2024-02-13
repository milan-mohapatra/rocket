export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export class CustomValidationError extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message.map((item) => {
            const {type, msg, path} = item
            return {type, msg, path}
        })
        this.statusCode = statusCode
    }
} 
import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    skills: [String],
    location: String,
    salary: {
        min: Number,
        max: Number,
    },
    recruiterId: mongoose.Schema.Types.ObjectId,
    deadline: Date
}, {timestamps: true})

const Job = mongoose.model("Job", jobSchema)

export default Job
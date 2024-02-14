const jobController = {};

/*
GET /api/jobs
Access: candidate
Desc: get all jobs to apply
*/
jobController.getAllJobs = async (req, res, next) => {
  res.json({ message: "all jobs" });
};

/*
POST /api/jobs
Access: recruiter
Desc: create a job
*/
jobController.createAJob = async (req, res, next) => {
  res.json({ message: "a job created" });
};

/*
POST /api/jobs
Access: candidate
Desc: apply for a job
*/
jobController.applyForJob = async (req, res, next) => {
  res.json({ message: "job applied" });
};

export default jobController;
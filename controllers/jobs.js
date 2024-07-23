const getAllJobs = async (req, res) => {
  res.status(200).send("All Jobs");
};

const getJob = async (req, res) => {
  res.status(200).send("Single Job");
};

const createJob = async (req, res) => {
  res.status(201).send("Job Created");
};

const updateJob = async (req, res) => {
  res.status(200).send("Job Updated");
};

const deleteJob = async (req, res) => {
  res.status(200).send("Job Deleted");
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};

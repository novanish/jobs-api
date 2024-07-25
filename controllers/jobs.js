const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/NotFoundError");

const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.payload.userId }).sort(
    "-updatedAt -createdAt"
  );

  res.json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.payload.userId;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);

  res.json({ job });
};

const createJob = async (req, res) => {
  const job = { ...req.body, createdBy: req.payload.userId };
  const newJob = await Job.create(job);
  res.status(StatusCodes.CREATED).json({ job: newJob });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.payload.userId;

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);

  res.json({ job });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.payload.userId;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);

  res.status(200).json({ job });
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};

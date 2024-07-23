const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 50,
      trim: true,
    },

    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: 100,
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "interview", "rejected", "hired"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

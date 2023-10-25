const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxlength: 50,
    },
    position: {
      type: String,
      required: true,
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Job", jobSchema);

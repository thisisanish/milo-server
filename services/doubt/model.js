import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is  required"],
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: ''
    },
    question: {
      type: String,
      required: [true, "Question is  required"],
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Doubt = mongoose.models["doubt"] || mongoose.model("doubt", doubtSchema);
export default Doubt;

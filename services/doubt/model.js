import mongoose from "mongoose";
// Thoughts : We can have a nain Question and a supporting sub text tather then the Title and the Main  Question.
const doubtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is  required"],
    },
    // equivalent to Subject for for mail. Thinking of ditching this field.
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

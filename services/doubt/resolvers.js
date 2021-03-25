import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
import Doubt from "./model";

export default {
  Doubt: {
    author(doubt) {
      return { __typename: "User", id: doubt.authorID };
    },
  },
  User: {
    async doubts(user) {
      return await Doubt.find({ authorID: user.id }).exec();
    },
  },
  Query: {
    async doubt(parent, { id }, context, info) {
      return await Doubt.findById(id).exec();
    },
    async doubts(parent, args, context, info) {
      return await Doubt.find({}).exec();
    },
  },

  Mutation: {
    async addDoubt(parent, doubt, context, info) {
      return await Doubt.create({
        ...doubt,
        authorID: mongoose.Types.ObjectId(doubt.authorID),
      });
    },
  },
};

import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

import User from "./model";

export default {
  User: {
    async __resolveReference(object) {
      return await User.findById(object.id).exec();
    }
  },
  Query: {
    async user(parent, { id }, context, info) {
      return await User.findById(id).exec();
    },

    async isUser(_, {email}, context, info) {
      const user = await User.findOne({email}).exec();
      return  user ? true : false 
    },

    async users(parent, args, context, info) {
      return await User.find({}).exec(); 
    },

    async me(parent, args, context, info){
      return await User.findOne({email: context.email}).exec();
    }
  },

  Mutation: {
    async addUser(parent, user, context, info) {
     return await User.create({
      ...user,
     });
    },
    
  }
};
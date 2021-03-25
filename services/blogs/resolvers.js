import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
import Blog from "./model";

export default {
  Blog: {
    author(blog) {
      return { __typename: "User", id: blog.authorID };
    },
  },
  User: {
    async blogs(user){
      return await Blog.find({authorID: user.id}).exec();
    }
  },
  Query: {
    async blog(parent, { id }, context, info) {
      return await Blog.findById(id).exec();
    },
    async blogs(parent, args, context, info) {
      return await Blog.find({}).exec();
    },
  },

  Mutation: {
    async addBlog(parent, blog, context, info) {
     return await Blog.create({
      ...blog,
      authorID: mongoose.Types.ObjectId(blog.authorID)
    });
      
    },
    
  }
};




// __resolveReference(object) {
//   return await Blog.findById(object.id).exec();
// }
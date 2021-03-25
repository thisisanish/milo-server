import dotenv from "dotenv"
dotenv.config();

import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation"


import connectMongoDB from "../../utils/mongoDB";
import resolvers from "./resolvers";
import typeDefs from "./typedefs"

import Blog from "./model";

const port  = process.env.BLOG_SERVICE_PORT;

// connect to User DB
connectMongoDB({url :process.env.BLOG_MONGODB_URI, name: "blogs"});

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ 
  schema, 
  context:{
    Blog
  }
});

server.listen({port}).then(({ url }) => {
  console.log(`🚀 Blogs service ready at ${url}`);
});
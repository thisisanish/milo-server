import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import connectMongoDB from "../../utils/mongoDB";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

const port = process.env.DOUBT_SERVICE_PORT;

// connect to User DB
connectMongoDB({ url: process.env.DOUBT_MONGODB_URI, name: "doubt" });

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ schema });

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Doubt service ready at ${url}`);
});

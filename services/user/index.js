import dotenv from "dotenv"
dotenv.config();

import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation"


import connectMongoDB from "../../utils/mongoDB";
import resolvers from "./resolvers";
import typeDefs from "./typedefs"

const port  = process.env.USER_SERVICE_PORT;

// connect to User DB
connectMongoDB({url :process.env.USER_MONGODB_URI, name: "users"});

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ schema });

server.listen({port}).then(({ url }) => {
  console.log(`🚀 Users service ready at ${url}`);
});
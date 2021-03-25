import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";
import { Magic } from "@magic-sdk/admin";
// models
import User from "./services/user/model";
import Blog from "./services/blogs/model";
import Doubt from "./services/doubt/model";

const port = process.env.GQL_GATEWAY_SERVICE_PORT;
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const gateway = new ApolloGateway({
  serviceList: [
    { name: "Users", url: "http://localhost:4001" },
    { name: "Blogs", url: "http://localhost:4002" },
    { name: "Doubts", url: "http://localhost:4003" },
  ],
  // introspectionHeaders: {
  //   Authorization: 'Bearer abc123'
  // }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: async ({ req }) => {
    // add user details if loggedin
    let user = null,
      authHeader = req.headers.authorization;

    if (authHeader) {
      const didToken = magic.utils.parseAuthorizationHeader(
        req.headers.authorization
      );
      user = await magic.users.getMetadataByToken(didToken);
    }

    return {
      user,
      models: {
        User,
        Blog,
        Doubt,
      },
    };
  },
  // typeDefs,
  // resolvers,
  // context,
  // introspection,
  // persistedQueries,
  // cors,
});

// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

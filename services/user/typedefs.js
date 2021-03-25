import { gql } from  "apollo-server";

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    fullname: String!
    title: String
    email: String!
    verified: Boolean!
    summary: String
    university: String
    avatar: String
  }

  extend type Query {
    user(id: ID!): User!
    isUser(email: String!): Boolean!
    users: [User!]
    me: User!
  }

  extend type Mutation {
    addUser( 
      fullname: String!, 
      title: String, 
      email:String!, 
      summary: String, 
      university: String,
      avatar: String
    ): User!
  }
`;
 
export default typeDefs;
import { gql } from "apollo-server";

export default gql`
  type Doubt @key(fields: "id") {
    id: ID!
    question: String!
    authorID: ID!
    tags: [String!]
    author: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    doubts: [Doubt]
  }

  extend type Query {
    Doubt(id: ID!): Doubt!
    doubts: [Doubt!]
  }

  extend type Mutation {
    addDoubt(
      title: String!
      question: String!
      authorID: ID!
      tags: [String!]
    ): Doubt!
  }
`;

import { gql } from  "apollo-server";

export default gql`
  type Blog @key(fields: "id") {
    id: ID!
    title: String!
    authorID: ID!
    content: String!
    description: String
    tags: [String!]
    author: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    blogs: [Blog]
  }

  extend type Query {
    blog(id: ID!): Blog!
    blogs: [Blog!]
  }

  extend type Mutation {
    addBlog( 
      title: String!, 
      authorID: ID!,
      content: String!, 
      description: String, 
      tags:[String!],
    ): Blog!
  }
`; 
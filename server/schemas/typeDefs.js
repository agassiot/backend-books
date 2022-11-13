

var { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    title: String!
    description: String
    image: String
    link: String
  }

  input bookInput{
    bookId: ID!
    authors:[String]
    title:String!
    description: String
    link: String
    image: String
    description:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID! authors: [String], title:String!, description: String, image:String, link: String): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;


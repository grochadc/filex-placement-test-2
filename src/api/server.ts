import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "./types";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    section(course: String!, level: Int!): Section!
  }

  type Section {
    course: String! # either en/fr depending on the exam requested
    pageInfo: PageInfo
    questions: [Question!]!
  }

  # Pagination for the exam's answers. Each 'next page' is a the next level's answers.
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type Question {
    title: String!
    options: [AnswerOption!]!
  }

  type AnswerOption {
    text: String!
    correct: Boolean!
  }
`;

const resolvers: Resolvers = {
  Query: {
    section: (root, { course, level }, context) => {
      return {
        course: "en",
        questions: [
          {
            title: "Question 1",
            options: [
              {
                text: "Answer A",
                correct: true,
              },
            ],
          },
        ],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
    context: function({req,res}) {
        return new Promise(() => {
            return {
                miContexto: "Toma tu contexto!"
            }
        });
    },
    listen: {
      port: 5000
    }
});

console.log(`🚀  Server ready at: ${url}`);

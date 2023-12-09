import { ApolloServer } from "@apollo/server";
import type { Resolvers } from "./types";
import { gql } from "graphql-tag";
import QuestionsBank from "./questions.json";


type QuestionsPage = {
    title: string,
    options: { text: string, correct: boolean }[]
}[]
class QuestionsAPI {

  async getQuestions(page: number): Promise<QuestionsPage> {
    return QuestionsBank.sections[page].questions;
  }
}


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
    section: (root, { course, level }, { dataSources }) => {
      return {
        course: course,
        questions: dataSources.questionsAPI.getQuestions(level - 1),
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      };
    },
  },
};

interface ContextValue {
  dataSources: {
    questionsAPI: QuestionsAPI;
  }
}

export async function createContext():Promise<ContextValue> {
  return {
    dataSources: {
      questionsAPI: new QuestionsAPI()
    }
  }
}

export const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  introspection: true,
});



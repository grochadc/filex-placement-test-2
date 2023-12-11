import { ApolloServer } from "@apollo/server";
import type { Resolvers } from "./types";
import { gql } from "graphql-tag";
import QuestionsBank from "./questions.json";
import CarrerasCollection from "./carreras.json";


type QuestionsPage = {
    title: string,
    options: { text: string, correct: boolean }[]
}[]

type HomePageMessage = {
  active: boolean
  message: string
};

class QuestionsAPI {
  getCarreras(): { name: string, id: number }[] {
    return CarrerasCollection.map((carreraItem,index) => ({ id: index, name: carreraItem.name}));
  }
  getQuestions(page: number): QuestionsPage {
    return QuestionsBank.sections[page].questions;
  }
  getHomePageSettings(): { active: boolean, message: string} {
    return { active: true, message: "No message on the homepage" };
  }

  // deprecated in favor of merging both into getSettings()
  getSettings() : { isClosed: boolean, homepageMessage: HomePageMessage } {
    return {
      isClosed: this.getIsClosed(),
      homepageMessage: this.getHomepageMessage()
    }

  }
  getIsClosed(): boolean {
    return false;
  }
  getHomepageMessage(): HomePageMessage {
    return {
      active: false,
      message: ""
    }
  }
}


const typeDefs = gql`
  type Query {
    carreras: [Carrera!]!
    isClosed: Boolean! # deprecated, favor settings.isClosed
    placementHomePageMessage: HomePageMessage! # deprecated favor settings.homePageMessage
    settings: PlacementSettings
    section(course: String!, level: Int!): Section!
  }

  type Carrera {
    id: ID!
    name: String!
  }

  type PlacementSettings {
    homePageMessage: HomePageMessage!
    isClosed: Boolean!
  }

  type HomePageMessage {
    active: Boolean!
    message: String!
  }

  type Section {
    id: ID!
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
    carreras: (root, args, { dataSources }) => {
      return dataSources.questionsAPI.getCarreras();
    },
    section: (root, { course, level }, { dataSources }) => {
      //ID is the index on the array of questions which is one less than the level requested
      if(level<1 || level>8) throw new Error("Level requested is out of scope for the exam.");
      const sectionIDNum = level - 1;
      return {
        id: String(sectionIDNum),
        course: course,
        questions: dataSources.questionsAPI.getQuestions(sectionIDNum),
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      };
    },
    settings: (root, args, { dataSources }) => {
      const isClosed = false;
      return dataSources.questionsAPI.getSettings()
    },
    // deprecated
    isClosed: () => false,
    placementHomePageMessage: () => ({ active: false, message: "" }),
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



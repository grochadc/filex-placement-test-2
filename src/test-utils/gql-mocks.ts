import { DocumentNode } from "@apollo/client";
import { TEST_SECTION_QUERY } from "../components/Section";
import exam from "../data/questions.json";

export interface Mock {
  request: { query: DocumentNode; variables?: any };
  result: { data: any };
}

export const examSectionMock: Mock = {
  request: {
    query: TEST_SECTION_QUERY,
    variables: { course: "en", level: 1 },
  },
  result: {
    data: {
      section: {
        questions: [...exam.sections[0].questions],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      },
    },
  },
};

export const examSectionMocks: Mock[] = [
  {
    request: {
      query: TEST_SECTION_QUERY,
      variables: { course: "en", level: 1 },
    },
    result: {
      data: {
        section: {
          questions: [...exam.sections[0].questions],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
        },
      },
    },
  },
  {
    request: {
      query: TEST_SECTION_QUERY,
      variables: { course: "en", level: 2 },
    },
    result: {
      data: {
        section: {
          questions: [...exam.sections[1].questions],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: true,
          },
        },
      },
    },
  },
];

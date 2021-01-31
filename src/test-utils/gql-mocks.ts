import { DocumentNode } from "@apollo/client";
import { TEST_SECTION_QUERY } from "../components/Section";

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
        questions: [
          {
            title: "Question title",
            options: [
              {
                text: "Option 1",
                correct: false,
              },
              {
                text: "Option 2",
                correct: true,
              },
            ],
          },
        ],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
        },
      },
    },
  },
};

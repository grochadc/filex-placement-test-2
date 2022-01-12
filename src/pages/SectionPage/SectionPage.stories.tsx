import React, { useState } from "react";
import SectionPage, { SectionPageQuery } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import generateMock from "../../testutils/generatedMocks";
import { questions as _mockQuestions } from "../mockData";
const mockQuestions = _mockQuestions.slice(0, 6);
const mocks = [
  generateMock(
    SectionPageQuery,
    { course: "en", level: 1 },
    {
      data: {
        section: {
          questions: mockQuestions,
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
        },
      },
    }
  ),
  generateMock(
    SectionPageQuery,
    { course: "en", level: 2 },
    {
      data: {
        section: {
          questions: mockQuestions,
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
        },
      },
    }
  ),
  generateMock(
    SectionPageQuery,
    { course: "en", level: 7 },
    {
      data: {
        section: {
          questions: mockQuestions,
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: true,
          },
        },
      },
    }
  ),
];

export default {
  title: "Pages/Section",
  component: SectionPage,
  argTypes: {
    onNextLevel: { action: "nextLevel" },
    onFinishExam: { action: "finishExam" },
  },
  parameters: {
    apolloClient: {
      mocks: mocks,
    },
  },
} as ComponentMeta<typeof SectionPage>;

const Template: ComponentStory<typeof SectionPage> = (args, context) => (
  <SectionPage {...args} {...context} />
);

export const Conected = Template.bind({});
Conected.args = { course: "en" };
Conected.decorators = [
  (Story) => {
    const [level, setLevel] = useState(1);
    return (
      <Story onNextLevel={() => setLevel(level + 1)} currentLevel={level} />
    );
  },
];

export const FirstLevel = Template.bind({});
FirstLevel.args = { course: "en", currentLevel: 1 };

export const LastLevel = Template.bind({});
LastLevel.args = { course: "en", currentLevel: 7 };

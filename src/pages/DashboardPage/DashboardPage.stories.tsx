import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DashboardPage, {
  DashboardPageQuery,
  CloseExamMutation,
  UpdateSingleLinkMutation,
  RemoveSingleLinkMutation,
  UpdateHomePageMessageMutation,
} from ".";
import generateMock from "../../testutils/generatedMocks";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "Pages/Dashboard",
  component: DashboardPage,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/dashboard"
    }
  }
} as ComponentMeta<typeof DashboardPage>;

const Template: ComponentStory<typeof DashboardPage> = () => <DashboardPage />;

export const Normal = Template.bind({});

Normal.parameters = {
  apolloClient: {
    mocks: [
      generateMock(DashboardPageQuery, {}, { data: { meetLinks: [{}] } }),
      generateMock(CloseExamMutation, {}, {}),
      generateMock(
        UpdateSingleLinkMutation,
        {},
        { data: { setMeetLink: 200 } }
      ),
      generateMock(
        RemoveSingleLinkMutation,
        {},
        { data: { removeMeetLink: 200 } }
      ),
      generateMock(
        UpdateHomePageMessageMutation,
        { active: true, message: "HomePageMessage-message" },
        { data: { setPlacementHomePageMessage: true } }
      ),
    ],
  },
};

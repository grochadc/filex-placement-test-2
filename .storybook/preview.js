import { MockedProvider } from '@apollo/client/testing'; 
import 'bootstrap/dist/css/bootstrap.min.css';
export const parameters = {
  apolloClient: {
    MockedProvider,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
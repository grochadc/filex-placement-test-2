module.exports = {
  "typescript": { "reactDocgen": false },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-addon-apollo-client",
    "storybook-addon-react-router-v6"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}
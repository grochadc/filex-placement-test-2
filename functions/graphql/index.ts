import { startServerAndCreateLambdaHandler, handlers } from "@as-integrations/aws-lambda";
import { server, createContext } from "./src/server";

export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
    { context: createContext }
);
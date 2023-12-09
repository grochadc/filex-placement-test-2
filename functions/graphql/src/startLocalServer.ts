import { startStandaloneServer } from "@apollo/server/standalone";
import { server, createContext } from "./server";

(async function () {
  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: {
      port: 5000
    }
  });

  console.log(`🚀  Server ready at: ${url}`);
})();

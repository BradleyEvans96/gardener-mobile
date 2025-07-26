import { bucket } from "./storage";

// export const myApi = new sst.aws.Function("MyApi", {
//   url: true,
//   link: [bucket],
//   handler: "packages/functions/src/api.handler",
// });

const api = new sst.aws.ApiGatewayV2("gardener-api", {});

api.route(
  "GET /highscores",
  "packages/application/highscores/highscoresGetHandler.handler"
);

// const api = new sst.aws.ApiGatewayV2("Api", {
//   transform: {
//     route: {
//       handler: {
//         link: [bucket],
//       },
//     },
//   },
// });

// api.route("GET /hello-world", "packages/functions/src/api.handler");

export default api;

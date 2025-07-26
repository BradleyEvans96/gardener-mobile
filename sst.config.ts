/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gardener-mobile",
      region: "eu-west-2",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = await import("./infra/storage");
    const api = await import("./infra/api");

    const web = await import("./infra/web");

    const url = web.web.url.apply((url) =>
      url === "http://url-unavailable-in-dev.mode"
        ? "http://localhost:5173/"
        : url
    );

    return {
      bucketName: bucket.bucket.name,
      api: api.default.url,
      web: url,
    };
  },
});

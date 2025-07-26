import api from "./api";
import { bucket } from "./storage";

const region = aws.getRegionOutput().name;

export const web = new sst.aws.StaticSite("Web", {
  path: "packages/web",
  build: {
    output: "dist",
    command: "npm run build",
  },
  domain: $app.stage === "production" ? "gardener-mobile.com" : undefined,
  environment: {
    VITE_REGION: region,
    VITE_API_URL: api.url,
    VITE_BUCKET: bucket.name,
  },
});

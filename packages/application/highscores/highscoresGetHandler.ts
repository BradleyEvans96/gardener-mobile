import {
  APIGatewayEvent,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { LambdaLogger } from "../helpers/logger";
import { z } from "zod";
import { Response } from "../helpers/restResponse/response";
import { HttpStatusCode } from "../types/http-status-code.enum";
import { Highscore } from "../models/Highscore";

const logger = new LambdaLogger({ serviceName: "highscores-post" });

const mockHighscores: Highscore[] = [
  {
    id: "1",
    userId: "user123",
    name: "Test User",
    score: 100,
    timestamp: "2023-10-01T12:00:00Z",
  },
];

export const handler = async () => {
  try {
    return Response.OK({
      message: "Highscores retrieved successfully",
      data: mockHighscores,
    });
  } catch (error) {
    logger.error({ message: `Error: GET /highscores: ${error}` });
    return Response.Error(
      new Error("Failed to get highscore"),
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

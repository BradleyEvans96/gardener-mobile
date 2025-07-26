import {
  APIGatewayEvent,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { LambdaLogger } from "../helpers/logger";
import { z } from "zod";
import { Response } from "../helpers/restResponse/response";
import { HttpStatusCode } from "../types/http-status-code.enum";

const logger = new LambdaLogger({ serviceName: "highscores-post" });

const highscoresSchema = z.object({
  userId: z.string(),
  score: z.number().int().min(0),
  timestamp: z.string().datetime(),
});

const getHighscoresParams = (event: APIGatewayEvent) => {
  const queryParams =
    event.queryStringParameters as APIGatewayProxyEventQueryStringParameters;
  const parsedParams = highscoresSchema.safeParse(queryParams);
  /* Maybe need authorisation header when set up */
  if (!parsedParams.success) {
    logger.error({
      message: `Invalid query parameters, error: ${parsedParams.error}`,
    });
    throw new Error("Invalid query parameters");
  }
  return parsedParams.data;
};

export const handler = async (event: APIGatewayEvent) => {
  try {
    const { userId, score, timestamp } = getHighscoresParams(event);
    // Here you would typically save the highscores to a database
    logger.info({
      message: `Highscore posted for user ${userId} with score ${score} at ${timestamp}`,
    });

    return Response.OK({
      message: "Highscore posted successfully",
      data: { userId, score, timestamp },
    });
  } catch (error) {
    logger.error({ message: `Error: POST /highscores: ${error}` });
    return Response.Error(
      new Error("Failed to post highscore"),
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

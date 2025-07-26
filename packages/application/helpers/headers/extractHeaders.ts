import { z } from "zod";

const headersSchema = z.object({
  Authorization: z.string(),
});

export function extractHeaders(headers: Record<string, string | undefined>) {
  const parsedHeaders = headersSchema.safeParse(headers);
  if (!parsedHeaders.success) {
    throw new Error("Invalid headers format");
  }
  const authorisation = parsedHeaders.data.Authorization;

  return { authorisation };
}

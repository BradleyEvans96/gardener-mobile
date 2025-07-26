import { HIGHSCORE_PREFIX, USER_PREFIX } from "../constants/PrimaryKeyPrefixes";
import { Highscore } from "../models/Highscore";

export type HighscoreEntity = Highscore & {
  partitionKey: string;
  sortKey: string;
};

/* Evaluate the PK and SK to be how we query them from the dynamo table */
export class HighscoreKeyBuilders {
  static readonly buildPartitionKey = (id: string): string =>
    `${HIGHSCORE_PREFIX}${id}`;
  static readonly buildSortKey = (userId: string) => `${USER_PREFIX}${userId}`;
}

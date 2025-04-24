import { ddbDocClient } from "../utils/ddb-client.mjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.TODO_TABLE;

export const getTodoById = async (id) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: { id },
  });

  try {
    const response = await ddbDocClient.send(command);
    return response.Item;
  } catch (err) {
    throw err;
  }
};

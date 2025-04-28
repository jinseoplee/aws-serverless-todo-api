import { ddbDocClient } from "../utils/ddb-client.mjs";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.TODO_TABLE;

export const getTodosByUsername = async (username) => {
  const command = new QueryCommand({
    TableName: tableName,
    IndexName: "UsernameIndex",
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": username,
    },
  });

  try {
    const response = await ddbDocClient.send(command);
    return response.Items;
  } catch (err) {
    throw err;
  }
};

import { ddbDocClient } from "../utils/ddb-client.mjs";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.TODO_TABLE;

export const deleteTodo = async (id, username) => {
  try {
    const command = new DeleteCommand({
      TableName: tableName,
      ConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
      Key: { id },
    });

    await ddbDocClient.send(command);
  } catch (err) {
    throw err;
  }
};

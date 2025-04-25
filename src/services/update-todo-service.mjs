import { ddbDocClient } from "../utils/ddb-client.mjs";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.TODO_TABLE;

export const updateTodo = async (id, username, title, completed) => {
  try {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { id },
      UpdateExpression: "set title = :title, completed = :completed",
      ConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":title": title,
        ":completed": completed,
        ":username": username,
      },
      ReturnValues: "ALL_NEW",
    });

    const response = await ddbDocClient.send(command);
    return response.Attributes;
  } catch (err) {
    throw err;
  }
};

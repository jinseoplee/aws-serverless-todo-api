import { ddbDocClient } from "../utils/ddb-client.mjs";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Todo } from "../models/todo.mjs";

const tableName = process.env.TODO_TABLE;

export const createTodo = async (username, title) => {
  try {
    const newTodo = new Todo(username, title);
    const command = new PutCommand({
      TableName: tableName,
      Item: { ...newTodo },
    });

    await ddbDocClient.send(command);
    return newTodo;
  } catch (err) {
    throw err;
  }
};

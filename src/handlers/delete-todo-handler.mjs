import { deleteTodo } from "../services/delete-todo-service.mjs";
import { error } from "../utils/logger.mjs";
import {
  noContent,
  forbidden,
  internalServerError,
} from "../utils/response.mjs";

export const deleteTodoHandler = async (event) => {
  const id = event.pathParameters.id;
  const username = event.requestContext.authorizer.claims["cognito:username"];

  try {
    await deleteTodo(id, username);
    return noContent();
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return forbidden();
    }

    error("Failed to delete todo item", "deleteTodoHandler", event, err);
    return internalServerError();
  }
};

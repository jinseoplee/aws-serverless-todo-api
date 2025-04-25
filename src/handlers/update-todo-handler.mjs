import { updateTodo } from "../services/update-todo-service.mjs";
import { error } from "../utils/logger.mjs";
import { ok, forbidden, internalServerError } from "../utils/response.mjs";

export const updateTodoHandler = async (event) => {
  const id = event.pathParameters.id;
  const username = event.requestContext.authorizer.claims["cognito:username"];
  const { title, completed } = JSON.parse(event.body);

  try {
    const todo = await updateTodo(id, username, title, completed);
    return ok(todo);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return forbidden();
    }

    error("Failed to update todo item", "updateTodoHandler", event, err);
    return internalServerError();
  }
};

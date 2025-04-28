import { createTodo } from "../services/create-todo-service.mjs";
import { error } from "../utils/logger.mjs";
import { created, internalServerError } from "../utils/response.mjs";

export const createTodoHandler = async (event) => {
  const body = JSON.parse(event.body);
  const title = body.title;
  const username = event.requestContext.authorizer.claims["cognito:username"];

  try {
    const todo = await createTodo(username, title);
    return created(todo);
  } catch (err) {
    error("Failed to create todo item", "createTodoHandler", event, err);
    return internalServerError();
  }
};

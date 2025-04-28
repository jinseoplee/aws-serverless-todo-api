import { getTodosByUsername } from "../services/get-todos-by-username-service.mjs";
import { error } from "../utils/logger.mjs";
import { ok, internalServerError } from "../utils/response.mjs";

export const getTodosByUsernameHandler = async (event) => {
  const username = event.requestContext.authorizer.claims["cognito:username"];

  try {
    const todos = await getTodosByUsername(username);
    return ok(todos);
  } catch (err) {
    error(
      "Failed to get todo items by username",
      "getTodosByUsernameHandler",
      event,
      err
    );
    return internalServerError();
  }
};

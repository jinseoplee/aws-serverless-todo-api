import { getTodoById } from "../services/get-todo-by-id-service.mjs";
import { ok, notFound, internalServerError } from "../utils/response.mjs";
import { error } from "../utils/logger.mjs";

export const getTodoByIdHandler = async (event) => {
  const id = event.pathParameters.id;

  try {
    const todo = await getTodoById(id);

    if (!todo) {
      return notFound("Todo not found");
    }
    return ok(todo);
  } catch (err) {
    error("Failed to get todo item by id", "getTodoByIdHandler", event, err);
    return internalServerError();
  }
};

// Creates a response object based on status code and data
const response = (statusCode, data) =>
  statusCode === 204
    ? { statusCode }
    : { statusCode, body: JSON.stringify(data) };

// Returns a 200 OK
export const ok = (data) => response(200, data);

// Returns a 201 Created
export const created = (data) => response(201, data);

// Returns a 204 No Content
export const noContent = () => response(204);

// Returns a 400 Bad Request
export const badRequest = (message = "Bad Request") =>
  response(400, { message });

// Returns a 401 Unauthorized
export const unauthorized = (message = "Unauthorized") =>
  response(401, { message });

// Returns a 403 Forbidden
export const forbidden = (message = "Forbidden") => response(403, { message });

// Returns a 404 Not Found
export const notFound = (message = "Not Found") => response(404, { message });

// Returns a 500 Internal Server Error
export const internalServerError = (message = "Internal Server Error") =>
  response(500, { message });

// Returns a 503 Service Unavailable
export const serviceUnavailable = (message = "Service Unavailable") =>
  response(503, { message });

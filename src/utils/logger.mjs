export const error = (message, functionName, event, err) => {
  console.error(message, {
    function: functionName,
    requestId: event.requestContext.requestId,
    stack: err.stack,
  });
};

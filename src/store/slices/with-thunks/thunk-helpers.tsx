export function handlePending(actionName: string, state: any) {
  state[actionName].isError = false;
  state[actionName].isLoading = true;
  state[actionName].message = "";
  state[actionName].statusCode = null;
}

export function handleFulfilled(actionName: string, state: any, action: any) {
  state[actionName].isLoading = false;
  state[actionName].message = action.payload.message;
  state[actionName].statusCode = action.payload.status;

  console.log("action in handleFulfilled " + actionName);
  console.log(action);
}

export function handleRejected(actionName: string, state: any, action: any) {
  state[actionName].isError = true;
  state[actionName].isLoading = false;
  state[actionName].message = action.payload;
  state[actionName].statusCode = 500;
}

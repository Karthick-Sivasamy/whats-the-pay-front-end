export const ApiCycleState = {
  response: undefined,
  isLoading: false,
  isError: false
};

export const CatchApiReduxErrorGlobal = (fn, errorConstant, dispatch) => {
  return fn().catch((error) => {
    dispatch({ type: errorConstant, payload: error.response });
  });
};

export const successDispatch = (successType, successResponseData) => ({
  type: successType,
  payload: successResponseData
});

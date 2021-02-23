import { PromptActionTypes } from "./prompt.types";

const INITIAL_STATE = {
  showPrompt: false,
  type: "",
  title: "",
  message: "",
};

const promptReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PromptActionTypes.TOGGLE_PROMPT:
      return {
        ...state,
        showPrompt: !state.showPrompt,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
      };

    default:
      return state;
  }
};

export default promptReducer;

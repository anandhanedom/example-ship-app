import { PromptActionTypes } from "./prompt.types";

export const togglePrompt = (type, title, message) => ({
  type: PromptActionTypes.TOGGLE_PROMPT,
  payload: { type, title, message },
});

import { AccessorActionTypes } from "./accessor.types";

export const updateAccessor = accessor => ({
  type: AccessorActionTypes.UPDATE_ACCESSOR,
  payload: accessor,
});

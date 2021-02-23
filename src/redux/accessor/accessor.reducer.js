import { AccessorActionTypes } from "./accessor.types";

const INITIAL_STATE = {
  accessor: {
    id: 1,
    name: "ABC",
    groups: ["Developer admin", "admin"],
  },
};

const accessorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccessorActionTypes.UPDATE_ACCESSOR:
      return {
        ...state,
        accessor: action.payload,
      };
    default:
      return state;
  }
};

export default accessorReducer;

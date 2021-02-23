import { combineReducers } from "redux";

import accessorReducer from "./accessor/accessor.reducer";
import promptReducer from "./prompt/prompt.reducer";

const rootReducer = combineReducers({
  accessor: accessorReducer,
  prompt: promptReducer,
});

export default rootReducer;

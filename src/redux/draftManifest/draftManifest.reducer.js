import { DraftManifestTypes } from "./draftManifest.types";

const INITIAL_STATE = {
  waybillNumbers: [],
  showManifest: false,
};

const accessorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DraftManifestTypes.ADD_TO_DRAFTMANIFEST:
      return {
        ...state,
        waybillNumbers: [...state.waybillNumbers, action.payload],
      };

    case DraftManifestTypes.REMOVE_FROM_DRAFTMANIFEST:
      return {
        ...state,
        waybillNumbers: state.waybillNumbers.filter(
          waybillNumber => waybillNumber !== action.payload
        ),
      };

    case DraftManifestTypes.CLEAR_DRAFTMANIFEST:
      return {
        ...state,
        waybillNumbers: [],
      };

    case DraftManifestTypes.TOGGLE_DRAFTMANIFEST:
      return {
        ...state,
        showManifest: !state.showManifest,
      };

    default:
      return state;
  }
};

export default accessorReducer;

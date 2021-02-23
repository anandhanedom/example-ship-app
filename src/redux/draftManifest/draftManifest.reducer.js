import { DraftManifestTypes } from "./draftManifest.types";

const INITIAL_STATE = {
  waybillNumbers: [],
  showManifest: false,
};

const accessorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DraftManifestTypes.ADD_TO_DMANIFEST:
      return {
        ...state,
        waybillNumbers: [...state.waybillNumbers, action.payload],
      };

    case DraftManifestTypes.REMOVE_FROM_DMANIFEST:
      return {
        ...state,
        waybillNumbers: state.waybillNumbers.filter(
          waybillNumber => waybillNumber !== action.payload
        ),
      };

    case DraftManifestTypes.CLEAR_DMANIFEST:
      return {
        ...state,
        waybillNumbers: [],
      };

    case DraftManifestTypes.TOGGLE_DMANIFEST:
      return {
        ...state,
        showManifest: !state.showManifest,
      };

    default:
      return state;
  }
};

export default accessorReducer;

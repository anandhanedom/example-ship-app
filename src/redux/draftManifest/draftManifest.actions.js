import { DraftManifestTypes } from "./draftManifest.types";

export const addToManifest = waybillNumber => ({
  type: DraftManifestTypes.ADD_TO_DMANIFEST,
  payload: waybillNumber,
});

export const removeFromManifest = waybillNumber => ({
  type: DraftManifestTypes.REMOVE_FROM_DMANIFEST,
  payload: waybillNumber,
});

export const clearManifest = () => ({
  type: DraftManifestTypes.CLEAR_DMANIFEST,
});

export const toggleManifest = () => ({
  type: DraftManifestTypes.TOGGLE_DMANIFEST,
});

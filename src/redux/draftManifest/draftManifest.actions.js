import { DraftManifestTypes } from "./draftManifest.types";

export const addToManifest = waybillNumber => ({
  type: DraftManifestTypes.ADD_TO_DRAFTMANIFEST,
  payload: waybillNumber,
});

export const removeFromManifest = waybillNumber => ({
  type: DraftManifestTypes.REMOVE_FROM_DRAFTMANIFEST,
  payload: waybillNumber,
});

export const clearManifest = () => ({
  type: DraftManifestTypes.CLEAR_DRAFTMANIFEST,
});

export const toggleManifest = () => ({
  type: DraftManifestTypes.TOGGLE_DRAFTMANIFEST,
});

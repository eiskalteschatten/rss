import { Reducer } from 'redux';
import { FolderActions } from '../actions/folderActions';

import Folder from '../../../../types/Folder';

export interface FolderState {
  folders: Folder[];
}

export const initialState: FolderState = {
  folders: []
};

const folderReducer: Reducer<FolderState, FolderActions> = (
  state: FolderState = initialState,
  action: FolderActions
): any => {
  switch (action.type) {
    case 'FOLDER_SET_ALL':
      return {
        ...state,
        folders: action.folders
      };
    default:
      return state;
  }
};

export default folderReducer;

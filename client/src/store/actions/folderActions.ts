import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import Folder from '../../../../types/Folder';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from './appActions';

export interface FolderSetAll extends Action<'FOLDER_SET_ALL'> {
  folders: Folder[];
}

export interface FolderOpenDrawer extends Action<'FOLDER_OPEN_DRAWER'> {}
export interface FolderCloseDrawer extends Action<'FOLDER_CLOSE_DRAWER'> {}

export type FolderActions =
  FolderSetAll |
  FolderOpenDrawer |
  FolderCloseDrawer;

export const folderSetAll = (folders: Folder[]): FolderSetAll => ({
  type: 'FOLDER_SET_ALL',
  folders
});

export const folderOpenDrawer = (): FolderOpenDrawer => ({ type: 'FOLDER_OPEN_DRAWER' });
export const folderCloseDrawer = (): FolderCloseDrawer => ({ type: 'FOLDER_CLOSE_DRAWER' });

export const folderGetAll: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (folders: Folder[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    const res: any = await axios.get('/api/folder');
    dispatch(folderSetAll(res.data.folders));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all folders.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

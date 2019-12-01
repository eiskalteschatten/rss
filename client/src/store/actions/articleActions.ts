import axios from 'axios';
import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import Article from '../../../../types/Article';

import { AppStopLoadingAction, appStartLoading, appStopLoading, appSetFormError } from './appActions';

export interface ArticleSetAll extends Action<'ARTICLE_SET_ALL'> {
  articles: Article[]
}

export type ArticleActions = ArticleSetAll;

export const articleSetAll = (articles: Article[]): ArticleSetAll => ({
  type: 'ARTICLE_SET_ALL',
  articles
});

export const articleGetAllUnread: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (articles: Article[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    await axios.post('/api/refresh');
    const res: any = await axios.get('/api/article/unread');
    dispatch(articleSetAll(res.data.articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all articles.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

export const articleGetAll: ActionCreator<
  ThunkAction<
    Promise<AppStopLoadingAction>,
    null,
    null,
    AppStopLoadingAction
  >
> = (articles: Article[]): any => async (dispatch: Dispatch, getState: any): Promise<AppStopLoadingAction> => {
  dispatch(appStartLoading());
  dispatch(appSetFormError(''));

  try {
    await axios.post('/api/refresh');
    const res: any = await axios.get('/api/article');
    dispatch(articleSetAll(res.data.articles));
  }
  catch (error) {
    dispatch(appSetFormError('An error occurred while fetching all articles.'));
    console.error(error);
  }

  return dispatch(appStopLoading());
};

import { Reducer } from 'redux';
import { ArticleActions } from '../actions/articleActions';

import Article from '../../../../types/Article';

export interface ArticleState {
  articles: Article[];
  mobileDialogOpen: boolean;
}

export const initialState: ArticleState = {
  articles: [],
  mobileDialogOpen: false
};

const articleReducer: Reducer<ArticleState, ArticleActions> = (
  state: ArticleState = initialState,
  action: ArticleActions
): any => {
  switch (action.type) {
    case 'ARTICLE_SET_ALL':
      return {
        ...state,
        articles: action.articles
      };
    case 'ARTICLE_OPEN_MOBILE_DIALOG':
      return {
        ...state,
        mobileDialogOpen: true
      };
    case 'ARTICLE_CLOSE_MOBILE_DIALOG':
      return {
        ...state,
        mobileDialogOpen: false
      };
    default:
      return state;
  }
};

export default articleReducer;

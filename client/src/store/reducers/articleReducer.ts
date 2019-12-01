import { Reducer } from 'redux';
import { ArticleActions } from '../actions/articleActions';

import Article from '../../../../types/Article';

export interface ArticleState {
  articles: Article[];
}

export const initialState: ArticleState = {
  articles: []
};

const appReducer: Reducer<ArticleState, ArticleActions> = (
  state: ArticleState = initialState,
  action: ArticleActions
): any => {
  switch (action.type) {
    case 'ARTICLE_SET_ALL':
      return {
        ...state,
        articles: action.articles
      };
    default:
      return state;
  }
};

export default appReducer;

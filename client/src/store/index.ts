import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import app, { AppState } from './reducers/appReducer';
import feed, { FeedState } from './reducers/feedReducer';
import article, { ArticleState } from './reducers/articleReducer';
import folder, { FolderState } from './reducers/folderReducer';

const devExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = devExtension && process.env.NODE_ENV !== 'production' ? devExtension : compose;

const reducer = combineReducers({
  app,
  feed,
  article,
  folder
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

export interface State {
  app: AppState;
  feed: FeedState;
  article: ArticleState;
  folder: FolderState;
}

// Shortcuts
export const dispatch: ThunkDispatch<any, any, AnyAction> = store.dispatch.bind(store);
export const getState = store.getState.bind(store);

export default store;

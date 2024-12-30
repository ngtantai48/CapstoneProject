import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth.reducer';
import postReducer from './post/post.reducer';
import userReducer from './user/user.reducer';
import analyzeReducer from './analyze/analyze.reducer';
import predictReducer from './predict/predict.reducer';

const rootReducer = combineReducers<Types.IStoreState>({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  analyze: analyzeReducer,
  predict: predictReducer,
});

const store = configureStore({ reducer: rootReducer });

// Inferred type
export type AppDispatch = typeof store.dispatch;

export default store;

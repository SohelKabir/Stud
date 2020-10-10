import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import FashionReducer from './reducers/fashion';
import BlogsReducer from './reducers/blog';
import BeautyReducer from './reducers/beauty';
import FoodReducer from './reducers/food';
import HealthReducer from './reducers/health';
import HomeReducer from './reducers/home';
import AuthReducer from './reducers/auth';

const rootReducer = combineReducers({
  fashion: FashionReducer,
  blogs: BlogsReducer,
  beauty: BeautyReducer,
  food: FoodReducer,
  health: HealthReducer,
  home: HomeReducer,
  auth: AuthReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

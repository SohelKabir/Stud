import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import FashionReducer from './store/reducers/fashion';
import BlogsReducer from './store/reducers/blog';
import StudNavigator from './navigation/StudNavigator';
import BeautyReducer from './store/reducers/beauty';
import FoodReducer from './store/reducers/food';
import HealthReducer from './store/reducers/health';
import HomeReducer from './store/reducers/home';

const rootReducer = combineReducers({
  fashion: FashionReducer,
  blogs: BlogsReducer,
  beauty: BeautyReducer,
  food: FoodReducer,
  health: HealthReducer,
  home: HomeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <StudNavigator />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import NavigationContainer from './navigation/NavigationContainer';
import { store } from './store/configStore';

// const rootReducer = combineReducers({
//   fashion: FashionReducer,
//   blogs: BlogsReducer,
//   beauty: BeautyReducer,
//   food: FoodReducer,
//   health: HealthReducer,
//   home: HomeReducer,
//   auth: AuthReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// );

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
      <NavigationContainer />
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

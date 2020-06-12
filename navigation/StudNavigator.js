import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FashionScreen from '../screens/FashionScreen';
import colors from '../constants/colors';

const StudNavigator = createStackNavigator(
  {
    Fashion: FashionScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: ' Fashion Screen',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.secondary,
    },
  }
);

export default createAppContainer(StudNavigator);

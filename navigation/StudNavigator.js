import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import FashionScreen from '../screens/FashionScreen';
import colors from '../constants/colors';
import FashionDetailScreen from '../screens/FashionDetailScreen';
import BlogScreen from '../screens/BlogScreen';
import HealthAndFitnessScreen from '../screens/HealthAndFitnessScreen';
import FoodAndDrinkScreen from '../screens/FoodAndDrinkScreen';
import TechnologyScreen from '../screens/TechnologyScreen';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Fashion: FashionScreen,
    Blog: BlogScreen,
    Health_Fitnes: HealthAndFitnessScreen,
    FoodAndDrink: FoodAndDrinkScreen,
    Technology: TechnologyScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.primary,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 'auto',
      },
      style: {
        backgroundColor: colors.secondary,
      },
      scrollEnabled: true,
      indicatorStyle: {
        backgroundColor: colors.primary,
      },
    },
  }
);

const StudNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    FashionDetail: {
      screen: FashionDetailScreen,
      navigationOptions: ({ navigation }) => {
        return { headerTitle: navigation.getParam('fashionTitle') };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'STUD',
      headerStyle: {
        elevation: 0, //for android  //Removing header shadow //defualt has shadow
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios
      },
      headerTintColor: colors.primary,
    },
  }
);

export default createAppContainer(StudNavigator);

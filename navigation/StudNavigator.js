import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {
  Platform,
  Text,
  Image,
  SafeAreaView,
  Button,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import HeaderButton from '../components/UI/HeaderButton';
import FashionScreen from '../screens/FashionScreen';
import colors from '../constants/colors';
import FashionDetailScreen from '../screens/FashionDetailScreen';
import BlogScreen from '../screens/BlogScreen';
import HealthAndFitnessScreen from '../screens/HealthAndFitnessScreen';
import FoodAndDrinkScreen from '../screens/FoodAndDrinkScreen';
import BeautyScreen from '../screens/BeautyScreen';
import SettingScreen from '../screens/SettingScreen';
import AboutScreen from '../screens/AboutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AllScreen from '../screens/AllScreen';
import CompaniesAndShopsScreen from '../screens/CompaniesAndShopsScreen';
import PromoCodeScreen from '../screens/PromoCodeScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';
import ReviewsScreen from '../screens/ReviewsScreen';
import CustomDrawerComponent from '../screens/drawer/customDrawerComponent';
import BrandwiseReviewScreen from '../screens/brandwiseReviewScreen';
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';
import { store } from '../store/configStore';

const state = store.getState();
const token = state.auth.token;
const headerNavButton = (navData) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title='Menu'
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    All: AllScreen,
    Fashion: FashionScreen,

    Health_Fitnes: {
      screen: HealthAndFitnessScreen,
      navigationOptions: () => {
        return {
          tabBarLabel: 'Health & Fitness',
        };
      },
    },
    FoodAndDrink: {
      screen: FoodAndDrinkScreen,
      navigationOptions: () => ({
        tabBarLabel: 'Food & Drink',
      }),
    },
    Beauty: BeautyScreen,
    Blog: BlogScreen,
    // CompaniesAndShops: {
    //   screen: CompaniesAndShopsScreen,
    //   navigationOptions: () => {
    //     return {
    //       tabBarLabel: 'Companies & Shops',
    //     };
    //   },
    // },
    Brands: ReviewsScreen,
  },

  {
    lazy: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.primary,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 12,
        fontFamily: 'open-sans-bold',
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
    Tab: {
      screen: TabNavigator,
      navigationOptions: (navData) => ({
        headerTitle: (
          props // App Logo
        ) => (
          <Image
            style={{ width: 100, height: 50 }}
            source={require('../assets/studlogo.png')}
            resizeMode='contain'
          />
        ),
        headerLeft: () => headerNavButton(navData),
      }),
    },
    FashionDetail: {
      screen: FashionDetailScreen,
      navigationOptions: ({ navigation }) => {
        return { headerTitle: navigation.getParam('fashionTitle') };
      },
    },
    PromoCode: {
      screen: PromoCodeScreen,
      navigationOptions: ({ navigation }) => {
        return { headerTitle: 'Promo Code' };
      },
    },
    BrandwiseReview: {
      screen: BrandwiseReviewScreen,
      navigationOptions: ({ navigation }) => {
        return { headerTitle: navigation.getParam('brandName') };
      },
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },

    defaultNavigationOptions: {
      headerTitle: 'STUD',
      headerStyle: {
        elevation: 0, //for android  //Removing header shadow //defualt has shadow
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios
      },
      headerTintColor: colors.primary,
      headerBackTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  }
);

///Drawer setting///////
const settingStackNavigatior = createStackNavigator(
  {
    Setting: {
      screen: SettingScreen,

      navigationOptions: (navData) => ({
        headerTitle: 'Settings',
        headerLeft: () => headerNavButton(navData),
      }),
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);
const profileStackNavigatior = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,

      navigationOptions: (navData) => ({
        headerTitle: 'Profile',
        headerLeft: () => headerNavButton(navData),
      }),
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: (drawerConfig) => (
        <FontAwesome name='user' size={24} color={drawerConfig.tintColor} />
      ),
    },
  }
);
// const authStackNavigatior = createStackNavigator(
//   {
//     Auth: {
//       screen: AuthScreen,

//       navigationOptions: (navData) => ({
//         headerTitle: 'Auth',
//         headerLeft: () => headerNavButton(navData),
//       }),
//     },
//   }
//   // {
//   //   navigationOptions: {
//   //     drawerLabel: 'Support',
//   //     drawerIcon: (drawerConfig) => (
//   //       <FontAwesome name='support' size={24} color={drawerConfig.tintColor} />
//   //     ),
//   //   },
//   // }
// );
const aboutStackNavigatior = createStackNavigator(
  {
    About: {
      screen: AboutScreen,

      navigationOptions: (navData) => ({
        headerTitle: 'About',
        headerLeft: () => headerNavButton(navData),
      }),
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name='ios-information-circle-outline'
          size={24}
          color='black'
        />
      ),
    },
  }
);
const purchaseHistoryStackNavigatior = createStackNavigator(
  {
    About: {
      screen: PurchaseHistoryScreen,

      navigationOptions: (navData) => ({
        headerTitle: 'Purchases',
        headerLeft: () => headerNavButton(navData),
      }),
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'Purchases',
      drawerIcon: (drawerConfig) => (
        <Octicons name='history' size={24} color='black' />
      ),
    },
  }
);
const loggedInDrawer = {
  Home: StudNavigator,
  Purchases: purchaseHistoryStackNavigatior,
  // Setting: {
  //   screen: settingStackNavigatior,
  // },

  Profile: profileStackNavigatior,
  About: aboutStackNavigatior,
};

// const loggedOutDrawer = {
//   Home: StudNavigator,
//   // Purchases: purchaseHistoryStackNavigatior,
//   Setting: {
//     screen: settingStackNavigatior,
//   },

//   Profile: profileStackNavigatior,
//   About: aboutStackNavigatior,
// };

const drawerNavigator = createDrawerNavigator(loggedInDrawer, {
  contentComponent: CustomDrawerComponent,
});

const MainNavigator = createSwitchNavigator(
  {
    App: {
      screen: drawerNavigator,
      path: 'app',
    },
    Auth: {
      screen: AuthScreen,
      path: 'auth',
    },
    Startup: {
      screen: StartupScreen,
      path: 'startup',
    },
  },
  {
    initialRouteName: 'Startup',
  }
);

export default createAppContainer(MainNavigator);

// Support: SupportScreen,
//   About: AboutScreen,

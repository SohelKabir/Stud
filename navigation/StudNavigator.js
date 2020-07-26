import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import HeaderButton from '../components/UI/HeaderButton';
import FashionScreen from '../screens/FashionScreen';
import colors from '../constants/colors';
import FashionDetailScreen from '../screens/FashionDetailScreen';
import BlogScreen from '../screens/BlogScreen';
import HealthAndFitnessScreen from '../screens/HealthAndFitnessScreen';
import FoodAndDrinkScreen from '../screens/FoodAndDrinkScreen';
import TechnologyScreen from '../screens/TechnologyScreen';
import SettingScreen from '../screens/SettingScreen';
import AboutScreen from '../screens/AboutScreen';
import SupportScreen from '../screens/SupportScreen';
import AllScreen from '../screens/AllScreen';
import CompaniesAndShopsScreen from '../screens/CompaniesAndShopsScreen';

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
    Blog: BlogScreen,
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
    Technology: TechnologyScreen,
    CompaniesAndShops: {
      screen: CompaniesAndShopsScreen,
      navigationOptions: () => {
        return {
          tabBarLabel: 'Companies & Shops',
        };
      },
    },
  },
  {
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
const supportStackNavigatior = createStackNavigator(
  {
    Support: {
      screen: SupportScreen,

      navigationOptions: (navData) => ({
        headerTitle: 'Support',
        headerLeft: () => headerNavButton(navData),
      }),
    },
  },
  {
    navigationOptions: {
      drawerLabel: 'Support',
      drawerIcon: (drawerConfig) => (
        <FontAwesome name='support' size={24} color={drawerConfig.tintColor} />
      ),
    },
  }
);
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

const drawerNavigator = createDrawerNavigator({
  Home: StudNavigator,
  Setting: {
    screen: settingStackNavigatior,
  },
  Support: supportStackNavigatior,
  About: aboutStackNavigatior,
});

export default createAppContainer(drawerNavigator);

// Support: SupportScreen,
//   About: AboutScreen,

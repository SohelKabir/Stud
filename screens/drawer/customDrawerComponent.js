import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import colors from '../../constants/colors';
import { styles } from './styles';
import { Avatar, Accessory, Divider, Button } from 'react-native-elements';

const customDrawerComponent = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = !!state.auth.token;
  let profilePic;
  if (token) {
    profilePic = state.auth.user.user_profile_pic_url;
  } else {
    profilePic = null;
  }

  return (
    <>
      {token ? (
        <View style={styles.container}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.userInfoContainer}>
              <View>
                <Avatar
                  size='large'
                  rounded
                  source={{
                    uri:
                      profilePic !== null
                        ? profilePic
                        : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
                >
                  <Accessory />
                </Avatar>
                <View style={styles.usernameContainer}>
                  <Text style={styles.userName}>
                    {state.auth.user.fullname}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.drawerItemsContainer}>
              <DrawerItems {...props} />
            </View>
            <View style={styles.loginLogoutButton}>
              <Button
                title='Logout'
                type='solid'
                raised
                color={colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  //  props.navigation.navigate('Auth');
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      ) : (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <View style={styles.loginLogoutButton}>
              <Button
                title='Login'
                type='solid'
                raised
                color={colors.primary}
                onPress={() => {
                  // dispatch(authActions.logout());
                  props.navigation.navigate('Auth');
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default customDrawerComponent;

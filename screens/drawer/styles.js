import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    //flexDirection: 'row',
  },
  userInfoContainer: {
    display: 'flex',
    //height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemsContainer: {
    padding: 20,
  },
  avatar: {},
  usernameContainer: {
    marginTop: 15,
  },
  userName: {
    color: 'green',
    fontSize: 15,
    fontFamily: 'open-sans-bold',
  },
  loginLogoutButton: {
    // width: ,
    margin: 10,
    //alignSelf: 'flex-end',
  },
});

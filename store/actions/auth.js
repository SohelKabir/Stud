import { AsyncStorage } from 'react-native';
import { Platform, ToastAndroid, Alert } from 'react-native';
//import Snackbar from 'react-native-snackbar';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

let timer;

export const signup = (
  name,
  email,
  phone,
  password,
  user_created_at,
  imageProfilePic,
  imageSIDPic
) => {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password', password);
  formData.append('user_created_at', user_created_at);

  formData.append('profile_pic', imageProfilePic);
  formData.append('sid_pic', imageSIDPic);
  return async (dispatch) => {
    const response = await fetch('http://studbd.com/api/appRegistration', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: formData,
    });

    if (!response.ok) {
      const errorResData = await response.json();
      //  const errorId = errorResData.error.message;
      let message = errorResData.message;
      // if (errorId === 'EMAIL_EXISTS') {
      //   message = 'This email exists already!';
      // }
      console.log('=========!0k===========================');
      console.log(errorResData.message);
      console.log('============!ok========================');
      throw new Error(message);
    }
    // const resData = await response.json();

    // console.log('=============raw=ok======================');
    // console.log(resData.message);
    // console.log('==============raw= ok=====================');
    //const resData = await response.json();
    const resData = await response.text();
    // const resData = await JSON.parse(response);
    console.log('============parsed========================');
    console.log(resData);
    console.log('===============parsed=====================');

    console.log(response.message);
    const message = 'Signup successful! Please wait for admin approval.';

    if (Platform.OS != 'android') {
      Alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
    // dispatch(setLogoutTimer(parseInt(86400) * 1000));
    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(86400) * 1000
    // );
    //saveDataToStorage('', '', expirationDate);
  };
};

export const login = (email, password) => {
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  return async (dispatch) => {
    // Build formData object.

    const response = await fetch(
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVaAd-GrI-EWJQFTuWPpHUem1Zo8jND2I',
      'http://studbd.com/api/appLogin',
      {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/form-data',
        // },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      //   const errorId = errorResData.error.message;
      console.log('====================================');
      console.log(errorResData.message);
      console.log('====================================');
      let message = errorResData.message;
      // if (errorId === 'EMAIL_NOT_FOUND') {
      //   message = 'This email could not be found!';
      // } else if (errorId === 'INVALID_PASSWORD') {
      //   message = 'This password is not valid!';
      // }
      throw new Error(message);
    }

    console.log('=============raw=======================');
    console.log(response);
    console.log('==============raw======================');

    const resData = await response.json();
    console.log('============parsed========================');
    console.log(resData);
    console.log('===============parsed=====================');

    dispatch(setLogoutTimer(parseInt(resData.data.expiresIn) * 1000));
    dispatch({
      type: LOGIN,
      token: resData.data.Token,
      userId: resData.data.user.user_id,
    });

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.data.expiresIn) * 1000
    );

    saveDataToStorage(
      resData.data.Token,
      resData.data.user.user_id,
      expirationDate
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

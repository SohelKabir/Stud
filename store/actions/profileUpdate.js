import { Platform, ToastAndroid, Alert } from 'react-native';
import mime from 'mime';

export const profileUpdate = (
  user_id,
  name,
  email,
  phone,
  password,
  passwordConfirm,
  imageProfilePic,
  imageSIDPic
) => {
  let formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password', password);
  formData.append('passwordConfirm', passwordConfirm);

  if (imageProfilePic !== null) {
    formData.append('sid_pic', {
      // uri: imageSIDPic.uri,
      uri:
        Platform.OS === 'android'
          ? imageSIDPic.uri
          : imageSIDPic.uri.replace('file://', ''),
      type: mime.getType(imageSIDPic.uri),
      name: imageSIDPic.uri.split('/').pop(),
    });
  }
  if (imageSIDPic !== null) {
    formData.append('profile_pic', {
      // uri: imageProfilePic.uri,
      uri:
        Platform.OS === 'android'
          ? imageProfilePic.uri
          : imageProfilePic.uri.replace('file://', ''),
      type: mime.getType(imageProfilePic.uri),
      name: imageProfilePic.uri.split('/').pop(),
    });
  }
  if (imageProfilePic === null) {
    formData.append('profile_pic', '');
  }
  if (imageSIDPic === null) {
    formData.append('sid_pic', '');
  }

  return async (dispatch, getState) => {
    // getting token from store
    const token = getState().auth.token;
    //console.log(' from token: ' + token);
    try {
      const response = await fetch('http://studbd.com/api/appUpdateProfile', {
        method: 'POST',
        headers: {
          //   Accept: 'application/json',
          //   'Content-Type': 'multipart/form-data;',
          Token: token,
        },
        body: formData,
      });
      // console.log(response);
      if (!response.ok) {
        const errorResData = await response.json();
        //  const errorId = errorResData.error.message;
        let message = errorResData.message;
        // if (errorId === 'EMAIL_EXISTS') {
        //   message = 'This email exists already!';
        // }
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
        throw new Error(message);
      }

      const resData = await response.json();

      console.log('============resData========================');
      console.log(resData);
      console.log('===========resData=========================');

      const message = resData.message;

      if (Platform.OS != 'android') {
        Alert.alert(
          'Alert',
          message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      } else {
        ToastAndroid.show(message, ToastAndroid.LONG);
      }

      // console.log('from action ' + resData.map((a) => a.review_title));

      // dispatch({
      //   type: 'SET_BRANDS',
      //   brands: resData,
      // });
    } catch (error) {
      throw error;
    }
  };
};

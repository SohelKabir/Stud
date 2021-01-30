import { AsyncStorage } from 'react-native';
import { Platform, ToastAndroid, Alert } from 'react-native';
//import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import mime from 'mime';

export const postReview = (rating, title, description, sale_id, image) => {
  let formData = new FormData();
  formData.append('rating', rating);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('sale_id', sale_id);

  // // formData.append('profile_pic', imageProfilePic);
  // // formData.append('sid_pic', imageSIDPic);

  // formData.append('profile_pic', {
  //   uri:
  //     Platform.OS === 'android'
  //       ? imageProfilePic.uri
  //       : imageProfilePic.uri.replace('file://', ''),
  //   type: 'image/jpg',
  //   name: 'profile_pic.jpg',
  // });

  // let newImageUri = imageSIDPic.uri;
  // console.log('============uri========================');
  // console.log(newImageUri);
  // console.log('=============uri=======================');

  //const newImageUri =  "file:///" + path.split("file:/").join("");

  console.log('============uri========================');
  console.log(image.uri);
  console.log('=============uri=======================');

  formData.append('image', {
    // uri: imageSIDPic.uri,
    uri:
      Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
    type: mime.getType(image.uri),
    name: image.uri.split('/').pop(),
  });

  console.log('====================================');
  console.log(formData);
  console.log('====================================');
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    formData.append('Token', token);
    const response = await fetch('http://studbd.com/api/appSaveReview', {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'multipart/form-data;',
      //   Token: Token,
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

      if (Platform.OS != 'android') {
        Alert.alert(
          'Alert',
          errorResData.message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      } else {
        ToastAndroid.showWithGravity(
          errorResData.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
      throw new Error(message);
    }
    // const resData = await response.json();

    console.log('=============raw=ok======================');
    console.log(response);
    console.log('==============raw= ok=====================');
    // //const resData = await response.json();

    // console.log('=============raw=ok======================');
    // console.log(response.message);
    // console.log('==============raw= ok=====================');

    const resData = await response.text();
    // // const resData = await response.text();
    // // const resData = await JSON.parse(response);asd
    console.log('============parsed========================');
    console.log(resData);
    console.log('===============parsed=====================');

    // // const resData = await response.text();
    // // const resData = await JSON.parse(response);asd

    ////////////////////////

    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:3000/api/upload',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((success) => {
    //     console.log('upload success');
    //     console.log(success);
    //   })
    //   .catch((e) => {
    //     console.log('error: ', e);
    //   });

    // console.log('===========res=========================');
    // console.log(response);
    // console.log('===========res=========================');

    ////////////////////////

    //console.log(response.message);
    const message = resData;

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
    // dispatch(setLogoutTimer(parseInt(86400) * 1000));
    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(86400) * 1000
    // );
    //saveDataToStorage('', '', expirationDate);
  };
};

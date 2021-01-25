import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ToastAndroid,
  Text,
  Dimensions,
} from 'react-native';
//import Snackbar from 'react-native-snackbar';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/colors';
import * as authActions from '../../store/actions/auth';
import Dropdown from '../../components/UI/Dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [imageProfilePic, setImageProfilePic] = useState(null);
  const [imageSIDPic, setImageSIDPic] = useState(null);
  const [university, setUni] = useState('Select University');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Alert',
            'App need camera access to upload photo',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      }
    })();
  }, []);

  const pickImageProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageProfilePic(result);
    }
  };
  const pickImageSIDPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //  base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageSIDPic(result);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    inputValidities: {
      name: false,
      email: false,
      phone: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const user_created_at = new Date().toLocaleDateString();

  const authHandler = async () => {
    let action;

    if (isSignup) {
      console.log('====================================');
      console.log(imageProfilePic);
      console.log(imageSIDPic);
      console.log(isSignup);
      console.log('====================================');
      if (imageSIDPic === null) {
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            'Select student ID',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.showWithGravity(
            'All fields are mandatory',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
        return;
      } else if (imageProfilePic === null) {
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            'Select profile picture',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.showWithGravity(
            'All fields are mandatory',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
        return;
      } else {
        action = authActions.signup(
          formState.inputValues.name,
          formState.inputValues.email,
          formState.inputValues.phone,
          formState.inputValues.password,
          university,
          user_created_at,
          imageProfilePic,
          imageSIDPic
        );
      }
    }
    if (!isSignup) {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      if (!isSignup) {
        props.navigation.navigate('App');
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      console.log('authscreen error: ', err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      //enabled={false}
    >
      <LinearGradient
        colors={['#f6f8f9', '#e5ebee', '#d7dee3', '#f5f7f9']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 200, height: 100 }}
            source={require('../../assets/studlogo.png')}
            resizeMode='contain'
          />
        </View>

        <Card style={styles.authContainer}>
          <ScrollView>
            {isSignup ? (
              <Input
                id='name'
                label='Name'
                keyboardType='default'
                required
                name
                autoCapitalize='none'
                errorText='Please enter name'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
            ) : null}

            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            {isSignup ? (
              <Input
                id='phone'
                label='Phone Number'
                keyboardType='phone-pad'
                required
                phone
                autoCapitalize='none'
                errorText='Please enter valid phone'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
            ) : null}
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />

            {isSignup ? (
              <>
                <View style={{ paddingVertical: 15 }}>
                  <Text style={{ fontFamily: 'open-sans-bold' }}>
                    Select University Name
                  </Text>
                  <Dropdown university={university} setUni={setUni} />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 15,
                  }}
                >
                  {imageProfilePic && (
                    <Image
                      source={{ uri: imageProfilePic.uri }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                  <View style={{ width: windowWidth, paddingVertical: 10 }}>
                    <Button
                      title='Upload profile picture'
                      onPress={pickImageProfilePic}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {imageSIDPic && (
                    <Image
                      source={{ uri: imageSIDPic.uri }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                  <View style={{ width: windowWidth, paddingVertical: 10 }}>
                    <Button
                      title='Upload Student ID picture'
                      onPress={pickImageSIDPic}
                    />
                  </View>
                </View>
              </>
            ) : null}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={'black'}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`${isSignup ? 'Login' : 'Sign Up'}`}
                color={'green'}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Home'
                color={'blue'}
                onPress={() => {
                  props.navigation.navigate('App');
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Please Authenticate',
  // backgroundColor: '#00d4ff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 550,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
    //width: 100,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    // marginBottom:20
  },
});

export default AuthScreen;

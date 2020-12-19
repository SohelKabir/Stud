import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { profileUpdate } from '../store/actions/profileUpdate';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userInfo = state.auth.user;
  const user_id = userInfo.user_id;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userInfo.fullname);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone_number);
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [imageProfilePic, setImageProfilePic] = useState(null);
  const [imageSIDPic, setImageSIDPic] = useState(null);

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

  const submitProfileHandler = async () => {
    setLoading(true);
    await dispatch(
      profileUpdate(
        user_id,
        name,
        email,
        phone,
        password,
        confirmPass,
        imageProfilePic,
        imageSIDPic
      )
    );
    setLoading(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.fieldName}>
          <Text>Name</Text>
        </View>
        <Input
          placeholder='name'
          //leftIcon={{ type: 'font-awesome', name: 'n' }}
          // style={styles}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <View style={styles.fieldName}>
          <Text>Email</Text>
        </View>
        <Input
          placeholder='email'
          //leftIcon={{ type: 'font-awesome', name: 'n' }}
          // style={styles}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <View style={styles.fieldName}>
          <Text>Phone</Text>
        </View>
        <Input
          placeholder='phone'
          value={phone}
          //leftIcon={{ type: 'font-awesome', name: 'n' }}
          // style={styles}
          onChangeText={(value) => setPhone(value)}
          keyboardType='number-pad'
        />
        <View style={styles.fieldName}>
          <Text>Password</Text>
        </View>
        <Input
          placeholder='password'
          value={password}
          //leftIcon={{ type: 'font-awesome', name: 'n' }}
          // style={styles}
          onChangeText={(value) => setPassword(value)}
        />
        <View style={styles.fieldName}>
          <Text>Confirm Password</Text>
        </View>
        <Input
          placeholder='confirm password'
          value={confirmPass}
          //leftIcon={{ type: 'font-awesome', name: 'n' }}
          // style={styles}
          onChangeText={(value) => setconfirmPass(value)}
        />
        <View
          style={{
            padding: 15,
          }}
        >
          {imageProfilePic && (
            <Image
              source={{ uri: imageProfilePic.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button
            title='Upload profile picture'
            onPress={pickImageProfilePic}
          />
        </View>
        <View
          style={{
            padding: 15,
          }}
        >
          {imageSIDPic && (
            <Image
              source={{ uri: imageSIDPic.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title='Upload Student ID picture' onPress={pickImageSIDPic} />
        </View>
        <View style={styles.submitButton}>
          <Button
            title='Submit'
            loading={false}
            type='solid'
            onPress={submitProfileHandler}
            raised
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  submitButton: {
    width: '80%',
    paddingBottom: 30,
  },
  fieldName: {
    padding: 10,
    alignSelf: 'flex-start',
  },
});

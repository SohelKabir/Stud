import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  Clipboard,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { Input, Button, Overlay } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/actions/postReview';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReviewModal = ({
  toggleOverlay,
  brandName,
  brandImage,
  saleId,
  visible,
  setVisible,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [imageReviewPic, setImageReviewPic] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('====================================');
  console.log(brandName);
  console.log(brandImage);
  console.log(saleId);
  console.log('====================================');

  const dispatch = useDispatch();

  const ratingCompleted = (rating) => {
    //console.log('Rating is: ' + rating);
    setRating(rating);
  };

  const pickImageReviewPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageReviewPic(result);
    }
  };
  const submitReview = async () => {
    try {
      if (imageReviewPic === null) {
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            'All fields are mandatory',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.show('All fields are Mandatory', ToastAndroid.LONG);
        }
      }
      if (rating === '') {
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            'All fields are mandatory',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.show('All fields are Mandatory', ToastAndroid.LONG);
        }
      }
      if (description === '') {
        if (Platform.OS != 'android') {
          Alert.alert(
            'Alert',
            'All fields are mandatory',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          ToastAndroid.show('All fields are Mandatory', ToastAndroid.LONG);
        }
      } else {
        console.log('From Dispatch');
        setLoading(true);
        await dispatch(
          postReview(rating, title, description, saleId, imageReviewPic)
        );
        setLoading(false);
      }
    } catch (error) {
      if (Platform.OS != 'android') {
        Alert.alert(
          'Alert',
          'All fields are mandatory',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      } else {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }

      console.log('==========err==========================');
      console.log(error);
      console.log('===========err=========================');
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.centeredView}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <SafeAreaView style={styles.centeredView}>
          <SafeAreaView style={styles.modalView}>
            <SafeAreaView style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.logo}>
                  <Image
                    source={{
                      uri: brandImage,
                    }}
                    style={styles.image}
                  />
                </View>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => toggleOverlay()}
                >
                  <AntDesign name='closecircleo' size={24} color='red' />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.brandName}>{brandName}</Text>
              </View>

              <View style={styles.divider} />
              {/** This is Divider */}

              <ScrollView style={{ padding: 10 }}>
                <View style={{ paddingBottom: 70 }}>
                  <Text style={styles.titleText}>Enter a title</Text>
                  <Input
                    placeholder='Title*'
                    errorStyle={{ color: 'red' }}
                    //  errorMessage='ENTER A VALID ERROR HERE'
                    onChangeText={(value) => setTitle(value)}
                  />
                  <Text style={styles.titleText}>
                    Enter description (Max 500 words)
                  </Text>
                  <Input
                    placeholder='Description*'
                    errorStyle={{ color: 'red' }}
                    // errorMessage='ENTER A VALID ERROR HERE'
                    onChangeText={(value) => setDescription(value)}
                  />
                  <Text style={styles.titleText}>
                    Rate your experience out of 5
                  </Text>
                  <View style={styles.airbnbContainer}>
                    <AirbnbRating
                      showRating={false}
                      ratingCount={5}
                      defaultRating={1}
                      onFinishRating={ratingCompleted}
                      size={25}
                      reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                      starContainerStyle={styles.rating}
                    />
                  </View>

                  <View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 15,
                      }}
                    >
                      {imageReviewPic && (
                        <Image
                          source={{ uri: imageReviewPic.uri }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                      <View style={{ padding: 10 }}>
                        <Button
                          title='Upload a picture'
                          onPress={pickImageReviewPic}
                        />
                      </View>
                    </View>
                  </View>

                  <Button
                    title='Submit Review'
                    loading={loading}
                    onPress={submitReview}
                  />
                </View>
              </ScrollView>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: -10,
  },
  modalView: {
    //margin: 20,
    backgroundColor: '#fefdfa',
    borderRadius: 20,
    padding: 10,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth,
    height: windowHeight - 80,
  },
  closeButton: {
    backgroundColor: '#fefdfa',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginTop: -50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    // minWidth: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'yellow',
    marginHorizontal: 5,
    marginTop: -35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  image: {
    width: 100,
    height: 100,

    //borderBottomLeftRadius: 100, for half cutout
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  titleInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 12,
    fontFamily: 'open-sans',
    color: 'grey',
  },
  offerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerText: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: 'red',
    marginVertical: 10,
  },
  offerDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerDescription: {
    fontFamily: 'open-sans',
    fontSize: 12,
    margin: 10,
    color: 'grey',
  },

  promoCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row',

    flexWrap: 'nowrap',
  },
  promoCodetextBorder: {
    borderWidth: 1.5,
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoCodetext: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'green',
    margin: 10,
  },
  promoClipboardContainer: {
    backgroundColor: 'black',
    borderWidth: 1.5,
    marginTop: 20,
  },
  promoClipboardText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    margin: 10,
  },
  offerDescriptionContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  offerDescription2: {
    fontFamily: 'open-sans',
    fontSize: 12,
    margin: 5,
    color: 'grey',
  },
  termsTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  termsText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: colors.tomato,
    marginVertical: 10,
  },
  brandName: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: colors.accent,
    //marginVertical: 10,
    marginTop: -15,
  },
  titleText: {
    fontFamily: 'open-sans',
    fontSize: 18,
    color: colors.primary,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  airbnbContainer: {
    alignSelf: 'flex-start',
  },
});
export default ReviewModal;

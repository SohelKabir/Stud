import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReviewDetailsModal from './reviewDetailsModal';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BlogItem = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const ratingCompleted = (rating) => {
    //console.log('Rating is: ' + rating);
  };
  //Replacing string with ... if it's greater than defined value , useWordbounrey = true/false
  const truncate = (str, n, useWordBoundary) => {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1); // the original check
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + '...'
    );
  };

  let handleModal = async (status) => {
    // setItemId(id);
    setIsModalVisible(status);
  };

  console.log('===========blogs=========================');
  console.log(props);
  console.log('============blogs========================');
  return (
    <>
      <View style={styles.card} onPress={() => handleModal(true)}>
        <View style={styles.touchable}>
          <TouchableCmp useForeground onPress={() => handleModal(true)}>
            <View style={styles.blogContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {truncate(props.title, 25, true)}
                </Text>
                <Text style={styles.brandName}>{props.brand}</Text>
                <View style={styles.ratingContainer}>
                  <AirbnbRating
                    showRating={false}
                    ratingCount={5}
                    defaultRating={props.rating}
                    onFinishRating={ratingCompleted}
                    size={20}
                    reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                    starContainerStyle={styles.rating}
                  />
                </View>
              </View>
              <View style={styles.ImageContainer}>
                <Image
                  source={{
                    uri: props.image,
                  }}
                  style={styles.image}
                />
              </View>
            </View>
          </TouchableCmp>
        </View>
      </View>

      <ReviewDetailsModal
        isModalVisible={isModalVisible}
        handleModal={handleModal}
        itemId={itemId}
        image={props.image}
        review_body={props.review_body}
        title={props.title}
        brand={props.brand}
        rating={props.rating}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 100,
    margin: 12,
    marginVertical: 7,
    width: windowWidth - 15,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  blogContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    flexGrow: 2,
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  imageContainer: {
    flexGrow: 1,
    width: 100,
    height: 100,
    minWidth: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,

    //borderBottomLeftRadius: 100, for half cutout
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  brandName: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#888',
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  rating: {
    fontFamily: 'open-sans',
    fontSize: 12,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default BlogItem;

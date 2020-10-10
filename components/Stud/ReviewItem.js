import React, { useEffect, useState, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  //   FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import PromoCodeModal from '../../screens/PromoCodeScreen';
import { Rating, AirbnbRating } from 'react-native-ratings';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWidth = windowWidth / 2.12;
const cardHeight = cardWidth;

const OfferCard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let handleModal = (status, id) => {
    setItemId(id);
    setIsModalVisible(true);
    setIsModalVisible(status);
  };
  return (
    <>
      <View>
        <PromoCodeModal
          isModalVisible={isModalVisible}
          handleModal={handleModal}
          //itemId={itemId}
          image={props.image}
          brandName={props.brandName}
          title={props.title}
          offer_details={props.offer_details}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.touchable}>
          <TouchableCmp
            useForeground
            onPress={() => handleModal(true, props.title)}
          >
            <View style={styles.itemContainer}>
              <View style={styles.logo}>
                <Image
                  style={styles.image}
                  source={{
                    uri: props.image,
                  }}
                />
              </View>
              <View>
                <Text style={styles.brandName}>{props.brand}</Text>
              </View>

              <View style={styles.ratingContainer}>
                <AirbnbRating
                  showRating={false}
                  ratingCount={5}
                  defaultRating={props.rating}
                  //  onFinishRating={ratingCompleted}
                  size={20}
                  reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                  starContainerStyle={styles.rating}
                  isDisabled={true}
                />
              </View>
            </View>
          </TouchableCmp>
        </View>
      </View>
    </>
  );
};

export default memo(OfferCard);

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: cardHeight - 5,
    width: cardWidth - 5,
    margin: 5,
    // marginVertical: 5,
    // marginLeft: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemContainer: {
    height: cardHeight,
    display: 'flex',
    // backgroundColor: 'blue',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
  },
  OfferText: {
    // backgroundColor: 'yellow',
    color: 'red',
    fontFamily: 'open-sans-bold',
    margin: 10,
    fontSize: 15,
  },
  logo: {
    justifyContent: 'center',
    // borderRadius: 50,
    // backgroundColor: 'cyan',
    height: 80,
    width: 120,
    alignItems: 'center',
    //marginLeft: 20,
  },
  image: {
    // marginTop: 20,
    width: '100%',
    height: '100%',
    // borderRadius: 50,
  },
  discountText: {
    color: 'brown',
    fontFamily: 'open-sans',
    fontSize: 14,
    marginTop: 20,
    marginLeft: 10,
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  brandName: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#888',
  },
});

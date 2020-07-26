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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWidth = windowWidth / 2.12;
const cardHeight = cardWidth;

const OfferCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.card}>
      <View style={styles.touchable}>
        <TouchableCmp useForeground>
          <View>
            <Text style={styles.OfferText}>Offer</Text>
            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://lh6.googleusercontent.com/proxy/9wvYYedv_o4P7V_PX_StNOz457A38f69OsTi6OhwK5EhewnD2PVw4KYyXh6BfxssA_asNAVq4jG4ZlmOsdKQPQmF_6LKsfzflJohxIxYuLj2R50e8C1hegDErahnUMh8',
                }}
              />
            </View>
            <Text style={styles.discountText}>50% Student Discount!!</Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
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
    height: cardHeight,
    width: cardWidth,
    margin: 5,
    marginVertical: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  OfferText: {
    color: 'red',
    fontFamily: 'open-sans-bold',
    margin: 10,
    fontSize: 15,
  },
  logo: {
    //  backgroundColor: 'green',
    height: 70,
    width: 150,
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  image: {
    marginTop: 20,
    width: '50%',
    height: '50%',
  },
  discountText: {
    color: 'brown',
    fontFamily: 'open-sans',
    fontSize: 14,
    marginTop: 38,
    marginLeft: 8,
  },
});

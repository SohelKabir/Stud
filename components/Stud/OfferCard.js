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
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWidth = windowWidth / 2.12;
const cardHeight = cardWidth;

const OfferCard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');

  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth.user);

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
          promoCode={isLoggedIn ? userData.promocode : 'Login to get code'}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.touchable}>
          <TouchableCmp
            useForeground
            onPress={() => handleModal(true, props.title)}
          >
            <View style={styles.itemContainer}>
              <View style={styles.OfferTextContainer}>
                <Text style={styles.OfferText}>Offer</Text>
              </View>

              <View style={styles.logo}>
                <Image
                  style={styles.image}
                  source={{
                    uri: props.image,
                  }}
                />
              </View>

              <View style={styles.discountTextContainer}>
                <Text style={styles.discountText}>{props.title}</Text>
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
    // minHeight: cardHeight,
  },
  itemContainer: {
    display: 'flex',
    //  backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // minWidth: cardWidth - 5,
    height: cardHeight - 5,
  },
  OfferTextContainer: {
    alignSelf: 'flex-start',
    flex: 1,
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
    // backgroundColor: 'cyan',
    height: 70,
    width: 150,
    alignItems: 'center',
    // marginLeft: 20,
    flex: 2,
  },
  image: {
    // marginTop: 5,
    width: '80%',
    height: '80%',
  },
  discountText: {
    color: 'brown',
    fontFamily: 'open-sans',
    fontSize: 14,
    margin: 5,
    marginLeft: 10,
    // alignSelf: 'flex-end',
  },
  discountTextContainer: {
    flex: 1,
    //  backgroundColor: 'red',
    //alignSelf: 'flex-end',
    marginBottom: 5,
    // alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

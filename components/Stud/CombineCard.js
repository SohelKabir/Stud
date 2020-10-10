import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import BigCard from './BigCard';
import OfferCard from './OfferCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWidth = windowWidth / 2.12;
const cardHeight = cardWidth;

const CombineCard = ({ itemData }) => {
  // console.log(itemData.index);

  return (
    <>
      {itemData.index % 3 === 0 ? ( //itemData.index % 3 === 0 for two small card
        <View style={styles.BigCardContainer}>
          <BigCard
            image={itemData.item.offer_image_url}
            brandName={itemData.item.offer_brand}
            title={itemData.item.offer_name}
            offer_details={itemData.item.offer_details}
          />
        </View>
      ) : (
        <View style={styles.offerCardContainer}>
          <OfferCard
            image={itemData.item.offer_image_url}
            brandName={itemData.item.offer_brand}
            title={itemData.item.offer_name}
            offer_details={itemData.item.offer_details}
          />
        </View>
      )}
    </>
  );
};

export default CombineCard;

const styles = StyleSheet.create({
  BigCardContainer: {
    width: Dimensions.get('window').width,
  },
  offerCardContainer: {
    //  width: Dimensions.get('window').width / 2 - 10,
  },
});

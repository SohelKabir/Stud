import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../constants/colors';
import dayjs from 'dayjs';
import { Card, Button, Overlay } from 'react-native-elements';
import ReviewModal from './ReviewModal';

const PurchaseCard = ({ itemData }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  console.log(itemData);
  return (
    <>
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.brandTextStyle}>
            {itemData.item.sale_brand_name}
          </Text>
          <Text style={styles.promoTextStyle}>
            {itemData.item.sale_promocode}
          </Text>
          <Text style={styles.dateTextStyle}>
            {dayjs(itemData.item.sale_time).format('DD/MM/YYYY')}
          </Text>
          <View style={styles.buttonStyle}>
            <Button
              title={
                itemData.item.sale_review === null ? 'Write Review' : 'Reviewed'
              }
              size='small'
              disabled={itemData.item.sale_review !== null ? true : false}
              onPress={toggleOverlay}
            />
          </View>
        </View>
      </Card>

      <View>
        <ReviewModal
          toggleOverlay={toggleOverlay}
          brandName={itemData.item.brand_name}
          brandImage={itemData.item.brand_image_url}
          saleId={itemData.item.sale_id}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
    </>
  );
};

export default PurchaseCard;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  FlatListContainer: {
    backgroundColor: '#fff',
  },
  brandTextStyle: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
    color: Colors.tomato,
  },
  promoTextStyle: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginVertical: 2,
    color: Colors.accent,
  },
  dateTextStyle: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginVertical: 2,
    color: Colors.primary,
  },
  buttonStyle: {
    padding: 5,
  },
});

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

import Colors from '../constants/colors';
import { setPurchases } from '../store/actions/purchases';
import dayjs from 'dayjs';
import { Card, Button, Overlay } from 'react-native-elements';
import ReviewModal from '../components/Stud/ReviewModal';
import PurchaseCard from '../components/Stud/PurchaseCard';

const PurchaseHistoryScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const loadPurchases = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setPurchases());
      // await dispatch(setBrandwiseReviews('Madchef'));
      // await dispatch(setBrandwiseOffer());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadPurchases();
    setIsLoading(false);
  }, [dispatch, loadPurchases]);

  const purchases = useSelector((state) => state.purchases);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title='Try again'
          onPress={loadPurchases}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && purchases.length === 1) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && purchases.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No purchases found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.FlatListContainer}>
      <FlatList
        data={purchases}
        onRefresh={loadPurchases}
        refreshing={isRefreshing}
        // columnWrapperStyle={{
        //   flexWrap: 'wrap',
        //   flex: 1,
        //   justifyContent: 'center',
        // }}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => <PurchaseCard itemData={itemData} />}
      />
    </View>
  );
};
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

export default PurchaseHistoryScreen;

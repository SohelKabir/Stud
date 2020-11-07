import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';

import ReviewItem from '../components/Stud/ReviewItem';
import { setBrands } from '../store/actions/brands';
import { setBrandwiseReviews } from '../store/actions/brandwiseReview';
import Colors from '../constants/colors';
import { setBrandwiseOffer } from '../store/actions/brandwiseOffer';

const ReviewsScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadBrands = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setBrands());
      // await dispatch(setBrandwiseReviews('Madchef'));
      // await dispatch(setBrandwiseOffer());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadBrands();
    setIsLoading(false);
  }, [dispatch, loadBrands]);

  const brands = useSelector((state) => state.brands);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadBrands} color={Colors.primary} />
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
  if (!isLoading && brands.length === 1) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && brands.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No brands found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.FlatListContainer}>
      <FlatList
        data={brands}
        onRefresh={loadBrands}
        refreshing={isRefreshing}
        columnWrapperStyle={{
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'center',
        }}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <ReviewItem
            image={itemData.item.brand_image_url}
            // price={itemData.item.price}
            title={itemData.item.review_title}
            brand={itemData.item.brand_name}
            rating={itemData.item.review_rating}
            navigation={props.navigation}
            onViewDetail={() =>
              props.navigation.navigate('BrandwiseReview', {
                brandName: itemData.item.brand_name,
                // fashionTitle: itemData.item.title,
              })
            }
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  FlatListContainer: {
    backgroundColor: '#fff',
  },
});

export default ReviewsScreen;

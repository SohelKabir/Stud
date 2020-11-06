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

import { setBrandwiseReviews } from '../store/actions/brandwiseReview';
import Colors from '../constants/colors';
import BlogItem from '../components/Stud/BlogItem';

const BrandwiseReview = (props) => {
  const dispatch = useDispatch();

  const brandName = props.navigation.getParam('brandName');

  console.log('=============brandName=======================');
  console.log(props);
  console.log(brandName);
  console.log('===============brandName=====================');

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadBrandwiseReview = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      console.log('Before Dispatch');
      await dispatch(setBrandwiseReviews(brandName));
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadBrandwiseReview();
    setIsLoading(false);
  }, [dispatch, loadBrandwiseReview]);

  const brandwiseReviews = useSelector(
    (state) => state.brandwiseReviews.searchResult
  );
  const brandwiseReviewsLength = useSelector(
    (state) => state.brandwiseReviews.totalRows
  );

  console.log('===========brandwiseReviews=========================');
  console.log(brandwiseReviews);
  console.log('=============brandwiseReviews=======================');

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title='Try again'
          onPress={loadBrandwiseReview}
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

  if (!isLoading && brandwiseReviewsLength == 0) {
    return (
      <View style={styles.centered}>
        <Text>No reviews found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.FlatListContainer}>
      <FlatList
        data={brandwiseReviews}
        onRefresh={loadBrandwiseReview}
        refreshing={isRefreshing}
        columnWrapperStyle={{
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'center',
        }}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <BlogItem
            image={itemData.item.review_image_url}
            // price={itemData.item.price}
            title={itemData.item.review_title}
            brand={itemData.item.sale_brand_name}
            rating={itemData.item.review_rating}
            // onViewDetail={() =>
            //   props.navigation.navigate('FashionDetail', {
            //     fashionId: itemData.item.id,
            //     fashionTitle: itemData.item.title,
            //   })
            // }
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

export default BrandwiseReview;

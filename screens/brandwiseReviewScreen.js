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
  SectionList,
  Dimensions,
  Image,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { setBrandwiseReviews } from '../store/actions/brandwiseReview';
import { setBrandwiseOffer } from '../store/actions/brandwiseOffer';
import Colors from '../constants/colors';
import BlogItem from '../components/Stud/BlogItem';
import BigCard from '../components/Stud/BigCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BrandwiseReview = (props) => {
  const dispatch = useDispatch();

  const brandName = props.navigation.getParam('brandName');

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadBrandwiseReview = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setBrandwiseOffer(brandName));
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
  const state = useSelector((state) => state);
  const AverageRating = state.brandwiseReviews.averageReview;
  const brandwiseReviewsLength = useSelector((state) => state.brandwiseReviews);
  const brandwiseOffer = useSelector((state) => state.brandwiseOffer);
  const brands = useSelector((state) => state.brands);

  const brandInfo = brands.filter((brand) => brand.brand_name === brandName);

  //data for sectionList
  const combineData = [
    { title: 'Offers', data: brandwiseOffer },
    { title: 'Reviews', data: brandwiseReviews },
  ];

  console.log('==============combineData======================');
  console.log(combineData);
  console.log('===============combineData=====================');
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
  const headerComponent = () => (
    <>
      <View style={styles.headerContainer}>
        {/***<Text style={styles.brandName}>{brandInfo[0].brand_name}</Text> */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: brandInfo[0].brand_image_url }}
            style={{ height: 100, width: 100 }}
          />
        </View>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            showRating={false}
            ratingCount={5}
            defaultRating={AverageRating} //props.rating
            //  onFinishRating={ratingCompleted}
            size={20}
            reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
            starContainerStyle={styles.rating}
            isDisabled={true}
          />
        </View>
        <Text style={styles.brandAddress}>
          {brandInfo[0].brand_store_location !== null
            ? brandInfo[0].brand_store_location
            : 'Address unavailable'}
        </Text>
      </View>
    </>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (
    !isLoading &&
    brandwiseOffer.length == 0 &&
    brandwiseReviewsLength.length == 0
  ) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.FlatListContainer}>
      <SectionList
        sections={combineData}
        onRefresh={loadBrandwiseReview}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={headerComponent}
        // ListFooterComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => {
          return (
            <>
              {item.offer_brand ? (
                <View style={styles.BigCardContainer}>
                  <BigCard
                    image={item.offer_image_url}
                    brandName={item.offer_brand}
                    title={item.offer_name}
                    offer_details={item.offer_details}
                    offer_name={item.offer_name}
                  />
                </View>
              ) : (
                <BlogItem
                  image={item.review_image_url}
                  // price={itemData.item.price}
                  title={item.review_title}
                  brand={item.sale_brand_name}
                  rating={item.review_rating}
                  review_body={item.review_body}
                />
              )}
            </>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <>
            <View style={{ paddingTop: 10 }}>
              <View style={styles.divider} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.divider} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    // flexDirection: 'column',
  },
  FlatListContainer: {
    backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'center',
    //  alignItems: 'center',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
  },
  BigCardContainer: {
    width: Dimensions.get('window').width,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    color: Colors.tomato,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  brandName: {
    fontSize: 20,
    color: Colors.accent,
    fontFamily: 'open-sans-bold',
    paddingBottom: 10,
  },
  brandAddress: {
    fontSize: 15,
    color: Colors.grey,
    fontFamily: 'open-sans',
    padding: 5,
    paddingHorizontal: 10,
  },
  logoContainer: {
    paddingVertical: 10,
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
});

export default BrandwiseReview;

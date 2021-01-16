import React, { useState, useEffect, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';

import SlideShow from '../components/Stud/SlideShow';

import FashionItem from '../components/Stud/BigCard';
import { setFashion } from '../store/actions/fashion';
import Colors from '../constants/colors';

const FashionScreen = (props) => {
  // const fashion = useSelector((state) => state.fashion.fashion);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [fashionSliders, setFashionSliders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fashionSlidersImages = [];

  const loadFashion = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setFashion());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  ////

  //dispatch(setFashion(newData));
  useEffect(() => {
    setIsLoading(true);
    loadFashion();
    setIsLoading(false);
  }, [dispatch, loadFashion]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://studbd.com/api/category_sliders/Fashion'
      );
      const resData = await response.json();

      setFashionSliders(resData);
    };

    fetchData();
  }, []);

  const fashion = useSelector((state) => state.fashion);

  fashionSliders.forEach((fashionSlide) => {
    fashionSlidersImages.push(fashionSlide.slider_image_url);
  });
  // let handleModal = () => {
  //   setIsModalVisible(true);
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title='Try again'
          onPress={loadFashion}
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

  if (!isLoading && fashion.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Loading error!</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.FlatListContainer}>
        <FlatList
          ListHeaderComponent={
            <SlideShow images={fashionSlidersImages} sliderBoxHeight={200} />
          }
          data={fashion}
          onRefresh={loadFashion}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <>
              <FashionItem
                image={itemData.item.offer_image_url}
                brandName={itemData.item.offer_brand}
                title={itemData.item.offer_name}
                offer_details={itemData.item.offer_details}
                offer_name={itemData.item.offer_name}
              />
            </>
          )}
          // ListFooterComponent={
          //   //Footer Component // components below flat list will go here inside <> other compontes </>
          // }
        />
      </View>
    </>
  );
};

export default memo(FashionScreen);

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  FlatListContainer: {
    backgroundColor: '#fff',
  },
});

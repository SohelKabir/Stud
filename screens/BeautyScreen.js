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

import BigCard from '../components/Stud/BigCard';
import { setBeauty } from '../store/actions/beauty';
import Colors from '../constants/colors';

const BeautyScreen = (props) => {
  // const fashion = useSelector((state) => state.fashion.fashion);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [beautySliders, setBeautySliders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const beautySlidersImages = [];

  const loadBeauty = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setBeauty());
      // console.log("from beauty");
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  ////

  //dispatch(setBeauty(newData));
  useEffect(() => {
    setIsLoading(true);
    loadBeauty();
    setIsLoading(false);
  }, [dispatch, loadBeauty]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        //sliders
        'http://studbd.com/api/category_sliders/Fashion'
      );
      const resData = await response.json();

      setBeautySliders(resData);
    };

    fetchData();
  }, []);

  const beauty = useSelector((state) => state.beauty);
  //console.log(useSelector((state) => state));
  // console.log('data ' + beauty);

  beautySliders.forEach((beautySlide) => {
    beautySlidersImages.push(beautySlide.slider_image_url);
  });
  // let handleModal = () => {
  //   setIsModalVisible(true);
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadBeauty} color={Colors.primary} />
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

  if (!isLoading && beauty.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No data availabe!</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.FlatListContainer}>
        <FlatList
          ListHeaderComponent={
            <SlideShow images={beautySlidersImages} sliderBoxHeight={200} />
          }
          data={beauty}
          onRefresh={loadBeauty}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <>
              <BigCard
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

export default memo(BeautyScreen);

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  FlatListContainer: {
    backgroundColor: '#fff',
  },
});

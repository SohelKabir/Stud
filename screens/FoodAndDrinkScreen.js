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
  Dimensions,
} from 'react-native';

import SlideShow from '../components/Stud/SlideShow';

import BigCard from '../components/Stud/BigCard';
import { setFood } from '../store/actions/food';
import Colors from '../constants/colors';
import OfferCard from '../components/Stud/OfferCard';
import CombineCard from '../components/Stud/CombineCard';

const FoodScreen = (props) => {
  // const fashion = useSelector((state) => state.fashion.fashion);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [foodSliders, setFoodSliders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let [numOfColumns, setNumOfColumns] = useState(1);

  const foodSlidersImages = [];

  const loadFood = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setFood());
      // console.log("from Food");
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  ////

  //dispatch(setFood(newData));
  useEffect(() => {
    setIsLoading(true);
    loadFood();
    setIsLoading(false);
  }, [dispatch, loadFood]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        //sliders
        'http://studbd.com/api/category_sliders/Food'
      );
      const resData = await response.json();

      setFoodSliders(resData);
    };

    fetchData();
  }, []);

  const food = useSelector((state) => state.food);
  //console.log(useSelector((state) => state));

  const evenFoodItems = food.filter((a, i) => i % 2 === 0);
  //console.log(evenFoodItems);

  foodSliders.forEach((foodSlide) => {
    foodSlidersImages.push(foodSlide.slider_image_url);
  });

  // let handleModal = () => {
  //   setIsModalVisible(true);
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadFood} color={Colors.primary} />
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

  if (!isLoading && food.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Data unavailabe right now please pull to refresh the page !</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.Container}>
        <FlatList
          ListHeaderComponent={
            <SlideShow images={foodSlidersImages} sliderBoxHeight={200} />
          }
          columnWrapperStyle={{
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'center',
          }}
          numColumns={3}
          data={food}
          onRefresh={loadFood}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <>
              <CombineCard itemData={itemData} />
            </>
          )}
          ListFooterComponent={<></>}
        />
      </View>
    </>
  );
};

export default memo(FoodScreen);

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
});

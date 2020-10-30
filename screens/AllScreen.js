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
  AsyncStorage,
} from 'react-native';

import SlideShow from '../components/Stud/SlideShow';

import BigCard from '../components/Stud/BigCard';
import { setHome } from '../store/actions/home';
import Colors from '../constants/colors';
import OfferCard from '../components/Stud/OfferCard';
import CombineCard from '../components/Stud/CombineCard';

const AllScreen = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => !!state.auth.token);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [homeSliders, setHomeSliders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const homeSlidersImages = [];

  const loadHome = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setHome());
      // console.log("from Home");
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  ////

  //dispatch(setHome(newData));
  useEffect(() => {
    setIsLoading(true);
    loadHome();
    setIsLoading(false);
  }, [dispatch, loadHome]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        //sliders
        'http://studbd.com/api/home_sliders'
      );
      const resData = await response.json();

      setHomeSliders(resData);
    };

    fetchData();
  }, []);

  const home = useSelector((state) => state.home);
  //console.log(useSelector((state) => state));

  homeSliders.forEach((homeSlide) => {
    homeSlidersImages.push(homeSlide.slider_image_url);
  });

  // let handleModal = () => {
  //   setIsModalVisible(true);
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadHome} color={Colors.primary} />
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

  if (!isLoading && home.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.Container}>
        <FlatList
          ListHeaderComponent={
            <SlideShow images={homeSlidersImages} sliderBoxHeight={200} />
          }
          columnWrapperStyle={{
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'center',
          }}
          numColumns={3}
          data={home}
          onRefresh={loadHome}
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

export default memo(AllScreen);

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
});

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
import { setHealth } from '../store/actions/health';
import Colors from '../constants/colors';

const HealthScreen = (props) => {
  // const Health = useSelector((state) => state.Health.Health);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [healthSliders, setHealthSliders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const healthSlidersImages = [];

  const loadHealth = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setHealth());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  ////

  //dispatch(setHealth(newData));
  useEffect(() => {
    setIsLoading(true);
    loadHealth();
    setIsLoading(false);
  }, [dispatch, loadHealth]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://studbd.com/api/category_sliders/Health'
      );
      const resData = await response.json();

      setHealthSliders(resData);
    };

    fetchData();
  }, []);

  const health = useSelector((state) => state.health);

  healthSliders.forEach((healthSlide) => {
    healthSlidersImages.push(healthSlide.slider_image_url);
  });
  // let handleModal = () => {
  //   setIsModalVisible(true);
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadHealth} color={Colors.primary} />
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

  if (!isLoading && health.length === 0) {
    return (
      <>
        <SlideShow images={healthSlidersImages} sliderBoxHeight={200} />
        <View style={styles.centered}>
          <Text>Data unavailable!</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.FlatListContainer}>
        <FlatList
          ListHeaderComponent={
            <SlideShow images={healthSlidersImages} sliderBoxHeight={200} />
          }
          data={health}
          onRefresh={loadHealth}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <>
              <BigCard
                image={itemData.item.offer_image_url}
                brandName={itemData.item.offer_brand}
                title={itemData.item.offer_name}
                offer_details={itemData.item.offer_details}
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

export default memo(HealthScreen);

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  FlatListContainer: {
    backgroundColor: '#fff',
  },
});

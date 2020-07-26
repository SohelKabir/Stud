<<<<<<< HEAD
import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import SlideShow from '../components/Stud/SlideShow';
=======
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
>>>>>>> 64898417c224a33d76a3d47bd299032adbaa14f2

import FashionItem from '../components/Stud/FashionItem';

const FashionScreen = (props) => {
  const fashion = useSelector((state) => state.fashion.fashion);
<<<<<<< HEAD

  const [fashionSliders, setFashionSliders] = useState([]);
  const fashionSlidersImages = [];
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

  fashionSliders.forEach((fashionSlide) => {
    fashionSlidersImages.push(fashionSlide.slider_image_url);
  });

  return (
    <FlatList
      ListHeaderComponent={
        <SlideShow images={fashionSlidersImages} sliderBoxHeight={200} />
      }
      data={fashion}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <FashionItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onViewDetail={() =>
            props.navigation.navigate('FashionDetail', {
              fashionId: itemData.item.id,
              fashionTitle: itemData.item.title,
            })
          }
        />
      )}
      // ListFooterComponent={
      //   //Footer Component // components below flat list will go here inside <> other compontes </>
      // }
    />
  );
};

export default memo(FashionScreen);
=======
  //console.log(fashion);

  return (
    <View>
      <FlatList
        data={fashion}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <FashionItem
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            title={itemData.item.title}
            onViewDetail={() =>
              props.navigation.navigate('FashionDetail', {
                fashionId: itemData.item.id,
                fashionTitle: itemData.item.title,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default FashionScreen;
>>>>>>> 64898417c224a33d76a3d47bd299032adbaa14f2

const styles = StyleSheet.create({});

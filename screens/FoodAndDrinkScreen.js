import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SlideShow from '../components/Stud/SlideShow';

const FoodAndDrinkScreen = () => {
  const [foodSliders, setFoodSliders] = useState([]);
  const foodSlidersImages = [];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://studbd.com/api/category_sliders/Food'
      );
      const resData = await response.json();

      setFoodSliders(resData);
    };

    fetchData();
  }, []);

  foodSliders.forEach((foodSlide) => {
    foodSlidersImages.push(foodSlide.slider_image_url);
  });
  return (
    <View>
      <SlideShow images={foodSlidersImages} sliderBoxHeight={200} />
    </View>
  );
};

export default FoodAndDrinkScreen;

const styles = StyleSheet.create({});

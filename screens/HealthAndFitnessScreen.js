import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SlideShow from '../components/Stud/SlideShow';

const HealthAndFitnessScreen = () => {
  const [healthSliders, setHealthSliders] = useState([]);
  const healthSlidersImages = [];
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

  healthSliders.forEach((healthSlide) => {
    healthSlidersImages.push(healthSlide.slider_image_url);
  });
  return (
    <View>
      <SlideShow images={healthSlidersImages} sliderBoxHeight={200} />
    </View>
  );
};

export default HealthAndFitnessScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useState, memo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
//import Carousel from 'react-native-snap-carousel';

const SlideShow = (props) => {
  return (
    <View style={styles.card}>
      <SliderBox
        images={props.images}
        sliderBoxHeight={props.sliderBoxHeight}
        autoplay
        circleLoop
        dotColor='#FFEE58'
        inactiveDotColor='#90A4AE'
        // onCurrentImagePressed={(index) =>
        //   console.warn(`image ${index} pressed`)
        // }
        // currentImageEmitter={(index) =>
        //   console.warn(`current pos is: ${index}`)
        // }
      />
    </View>
  );
};

export default memo(SlideShow);

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 200,
    margin: 12,
    marginVertical: 7,
    overflow: 'hidden',
  },
});

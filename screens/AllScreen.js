import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SlideShow from '../components/Stud/SlideShow';
import OfferCard from '../components/Stud/OfferCard';
import FashionItem from '../components/Stud/FashionItem';

const AllScreen = () => {
  const fashion = useSelector((state) => state.fashion.fashion);
  //console.log(fashion[0]);
  const [homeSliders, setHomeSliders] = useState([]);
  const homeSlidersImages = [];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://studbd.com/api/home_sliders');
      const resData = await response.json();

      setHomeSliders(resData);
    };

    fetchData();
  }, []);

  homeSliders.forEach((homeSlide) => {
    homeSlidersImages.push(homeSlide.slider_image_url);
  });

  return (
    <ScrollView style={styles.TopContainer}>
      <SlideShow images={homeSlidersImages} sliderBoxHeight={200} />

      <View style={styles.OfferCard}>
        <View>
          <OfferCard />
        </View>

        <View>
          <OfferCard />
        </View>
        <View>
          <OfferCard />
        </View>

        <View>
          <OfferCard />
        </View>
      </View>

      <FashionItem
        image={fashion[0].imageUrl}
        price={fashion[0].price}
        title={fashion[0].title}
        onViewDetail={() =>
          props.navigation.navigate('FashionDetail', {
            fashionId: fashion[0].id,
            fashionTitle: fashion[0].title,
          })
        }
      />

      <View style={styles.OfferCard}>
        <View>
          <OfferCard />
        </View>

        <View>
          <OfferCard />
        </View>
        <View>
          <OfferCard />
        </View>

        <View>
          <OfferCard />
        </View>
      </View>
      <FashionItem
        image={fashion[1].imageUrl}
        price={fashion[1].price}
        title={fashion[1].title}
        onViewDetail={() =>
          props.navigation.navigate('FashionDetail', {
            fashionId: fashion[1].id,
            fashionTitle: fashion[1].title,
          })
        }
      />
    </ScrollView>
  );
};

export default AllScreen;

const styles = StyleSheet.create({
  TopContainer: {
    backgroundColor: 'white',
  },
  OfferCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

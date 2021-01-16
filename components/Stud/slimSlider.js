import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const slimSlider = () => {
  const [slimSlider, setSlimSlider] = useState([]);

  const [colorCode, setColorCode] = useState('#007bff');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        //sliders
        'http://studbd.com/api/topbar_sliders'
      );
      const resData = await response.json();

      setSlimSlider(resData);
    };

    fetchData();
  }, [colorCode]);

  useEffect(() => {
    setInterval(() => {
      const value = Math.floor(Math.random() * Math.floor(3));

      if (value === 0) {
        setColorCode('#21c87a');
      }
      if (value === 1) {
        setColorCode('#df1d46');
      }
      if (value === 2) {
        setColorCode('#007bff');
      }
    }, 5000);
  }, []);

  //   if(slimSlider.length === 0) {
  //       return
  //   }
  return (
    <View
      style={{
        backgroundColor: colorCode,
        height: 45,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        paddingVertical: 5,
        marginVertical: 12,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'open-sans-bold',
          fontSize: 20,
          marginVertical: 2,
          alignSelf: 'center',
        }}
      >
        {slimSlider.length === 0 ? 'Offers' : slimSlider[0].topbar_content}
      </Text>
    </View>
  );
};

export default slimSlider;

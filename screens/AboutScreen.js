import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const About = (props) => {
  const openLink = async (link) => {
    // const link = 'http://studbd.com/terms';

    if (await Linking.canOpenURL(link)) {
      Linking.openURL(link);
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          height: windowHeight,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'open-sans-bold',
              fontSize: 20,
            }}
          >
            The platform that empowers students and brings you the best offers
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{ color: 'black', fontFamily: 'open-sans', fontSize: 15 }}
          >
            Experience a new level of access to supercool offers and discounts.
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'open-sans-bold',
              fontSize: 20,
            }}
          >
            How it started
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{ color: 'black', fontFamily: 'open-sans', fontSize: 15 }}
          >
            The idea came as a thought when one of the founders, while studying
            in Australia saw that even as an international student, he could get
            discounts on food & beverages, clothes and many more just by using
            his identification as an international student. Later he realized
            how in our motherland, even our domestic students do not get access
            to such discounts in this scale. Then he decided to bring this to
            our motherland and the next thing he did was make a call to the
            other partner and start the creation of Stud Enterprises.
          </Text>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'open-sans',
              fontSize: 15,
            }}
          >
            For more info please visit:
          </Text>
          <TouchableOpacity
            accessibilityRole='link'
            onPress={() => openLink('http://studbd.com')}
          >
            <Text
              style={{
                color: colors.accent,
                fontFamily: 'open-sans',
                fontSize: 15,
              }}
            >
              www.studbd.com
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            accessibilityRole='link'
            onPress={() => openLink('http://studbd.com/terms')}
          >
            <Text
              style={{ color: 'grey', fontFamily: 'open-sans', fontSize: 15 }}
            >
              Terms and conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({});

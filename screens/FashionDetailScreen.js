import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/colors';

const FashionDetailScreen = (props) => {
  const fashionId = props.navigation.getParam('fashionId');
  // console.log(fashionId);
  const selectedFashionItem = useSelector((state) =>
    state.fashion.fashion.find((f) => f.id === fashionId)
  );
  // console.log(selectedFashionItem.title);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: selectedFashionItem.imageUrl }}
      />
      <View style={styles.actions}>
        <Button color={Colors.primary} title='Add to Cart' onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedFashionItem.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedFashionItem.description}</Text>
    </ScrollView>
  );
};

export default FashionDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

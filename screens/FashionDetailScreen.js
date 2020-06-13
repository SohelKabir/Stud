import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const FashionDetailScreen = (props) => {
  const fashionId = props.navigation.getParam('fashionId');
  // console.log(fashionId);
  const selectedFashionItem = useSelector((state) =>
    state.fashion.fashion.find((f) => f.id === fashionId)
  );
  // console.log(selectedFashionItem.title);

  return (
    <View styles={styles.fashion}>
      <Text>Selected Fashion Item Title: {selectedFashionItem.title}</Text>
    </View>
  );
};

export default FashionDetailScreen;

const styles = StyleSheet.create({
  fashion: {
    flex: 1,
    alignItems: 'center',
  },
});

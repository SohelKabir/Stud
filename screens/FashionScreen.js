import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

import FashionItem from '../components/Stud/FashionItem';

const FashionScreen = (props) => {
  const fashion = useSelector((state) => state.fashion.fashion);
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

const styles = StyleSheet.create({});

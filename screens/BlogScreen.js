import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const BlogScreen = () => {
  return (
    <View style={styles.demo}>
      <Text>From BlogScreen</Text>
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  demo: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

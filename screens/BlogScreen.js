import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';

import axios from 'axios';

import BlogItem from '../components/Stud/BlogItem';
import { setBlogs } from '../store/actions/blogs';
import Colors from '../constants/colors';

const BlogScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadBlogs = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setBlogs());
    } catch (error) {
      setError(error);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  //dispatch(setBlogs(newData));
  useEffect(() => {
    setIsLoading(true);
    loadBlogs();
    setIsLoading(false);
  }, [dispatch, loadBlogs]);

  const blogs = useSelector((state) => state.blogs);
  // console.log(blogs);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadBlogs} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && blogs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No blogs found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={blogs}
        onRefresh={loadBlogs}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.review_id}
        renderItem={(itemData) => (
          <BlogItem
            image={itemData.item.review_image_url}
            // price={itemData.item.price}
            title={itemData.item.review_title}
            brand={itemData.item.sale_brand_name}
            rating={itemData.item.review_rating}
            // onViewDetail={() =>
            //   props.navigation.navigate('FashionDetail', {
            //     fashionId: itemData.item.id,
            //     fashionTitle: itemData.item.title,
            //   })
            // }
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default BlogScreen;

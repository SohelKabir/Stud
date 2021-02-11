import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import CombineCard from '../components/Stud/CombineCard';
import { SafeAreaView } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchAll = () => {
  const home = useSelector((state) => state.home);

  const [searchValue, setSearchValue] = useState('');

  const filteredData = home.filter((item) =>
    item.brand_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log('====================================');
  console.log(filteredData);
  console.log('====================================');

  return (
    <SafeAreaView
      style={{ backgroundColor: '#fff', height: windowHeight, flex: 1 }}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <View>
              <Input
                placeholder='  Search brand name'
                leftIcon={<Icon name='search' size={24} color='black' />}
                onChangeText={(value) => setSearchValue(value)}
              />
            </View>
          </>
        }
        columnWrapperStyle={{
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'center',
        }}
        numColumns={3}
        data={filteredData}
        //  onRefresh={loadHome}
        // refreshing={isRefreshing}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <>
            <CombineCard itemData={itemData} />
          </>
        )}
        ListFooterComponent={
          <>
            <View style={{ padding: 50 }}></View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default SearchAll;

const styles = StyleSheet.create({});

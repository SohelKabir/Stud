import DropDownPicker from 'react-native-dropdown-picker';

import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { universityList } from '../../assets/university';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Dropdown = ({ university, setUni }) => {
  return (
    <Picker
      selectedValue={university}
      style={{ height: 50, width: windowWidth - 70 }}
      onValueChange={(itemValue, itemIndex) => setUni(itemValue)}
      mode='dialog'
    >
      {universityList.map((item) => (
        <Picker.Item
          label={item.university_name}
          value={item.university_name}
          key={item.university_id}
        />
      ))}
    </Picker>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});

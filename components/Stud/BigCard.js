import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../../constants/colors';
import PromoCodeModal from '../../screens/PromoCodeScreen';

const FashionItem = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let handleModal = (status, id) => {
    setItemId(id);
    setIsModalVisible(true);
    setIsModalVisible(status);
  };

  return (
    <>
      <View>
        <PromoCodeModal
          isModalVisible={isModalVisible}
          handleModal={handleModal}
          itemId={itemId}
          image={props.image}
          offer_details={props.offer_details}
        />
      </View>

      <View style={styles.fashion}>
        <View style={styles.touchable}>
          <TouchableCmp useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>

                <Text style={styles.brandName}>{props.brandName}</Text>
              </View>
              {/**<View style={styles.brand}>
                <Text style={styles.description}>{props.offer_details}</Text>
  </View> */}

              <View style={styles.actions}>
                <Button
                  color={Colors.primary}
                  title='Get now'
                  onPress={() => handleModal(true, props.title)}
                />
                {/*** <Button color={Colors.primary} title='Join' /> ***/}
              </View>
            </View>
          </TouchableCmp>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fashion: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 12,
    marginVertical: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  brand: {
    alignItems: 'center',
    height: '10%',
    padding: 10,
  },
  brandName: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
});

export default memo(FashionItem);

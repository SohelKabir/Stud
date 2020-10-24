import React, { useState } from 'react';
import {
  //Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PromoCodeScreen = ({
  isModalVisible,
  handleModal,
  itemId,
  image,
  offer_details,
  promoCode,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('==============promoCode======================');
  console.log(promoCode);
  console.log('==============promoCode======================');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        //presentationStyle='formSheet'
        //statusBarTranslucent={false}
        onRequestClose={() => {
          //executes on click of physical back button of phone

          //Alert.alert('Modal has been closed.');
          handleModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.logo}>
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={styles.image}
                  />
                </View>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => {
                    setModalVisible(false);
                    handleModal(false);
                  }}
                >
                  <AntDesign name='closecircleo' size={24} color='red' />
                </TouchableHighlight>
              </View>
              <View style={styles.divider} />
              {/** This is Divider */}
              <View style={styles.validityTextContainer}>
                <Text style={styles.validityText}>
                  Valid From 10/8/2020 to 30/8/2020
                </Text>
              </View>
              <View style={styles.offerTextContainer}>
                <Text style={styles.offerText}>25% Off!</Text>
              </View>
              <View style={styles.offerDescriptionContainer}>
                <Text style={styles.offerDescription}>{offer_details}</Text>
              </View>

              <View style={styles.promoCodeContainer}>
                <View style={styles.promoCodetextBorder}>
                  <Text style={styles.promoCodetext}>{promoCode}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => Clipboard.setString(promoCode)}
                >
                  <View style={styles.promoClipboardContainer}>
                    <Text style={styles.promoClipboardText}>Copy</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.offerDescriptionContainer2}>
                <Text style={styles.offerDescription2}>
                  This code can be used multipletimes. You can share it with
                  friends and family.
                </Text>
              </View>
              <View style={styles.divider} />
              {/** This is Divider */}

              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>Terms and Conditions</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    //margin: 20,
    backgroundColor: '#fefdfa',
    borderRadius: 20,
    padding: 20,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth,
  },
  closeButton: {
    backgroundColor: '#fefdfa',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginTop: -50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    // minWidth: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'yellow',
    marginHorizontal: 5,
    marginTop: -35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  image: {
    width: 100,
    height: 100,

    //borderBottomLeftRadius: 100, for half cutout
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  validityTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 12,
    fontFamily: 'open-sans',
    color: 'grey',
  },
  offerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerText: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: 'red',
    marginVertical: 10,
  },
  offerDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerDescription: {
    fontFamily: 'open-sans',
    fontSize: 12,
    margin: 10,
    color: 'grey',
  },

  promoCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row',

    flexWrap: 'nowrap',
  },
  promoCodetextBorder: {
    borderWidth: 1.5,
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoCodetext: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'green',
    margin: 10,
  },
  promoClipboardContainer: {
    backgroundColor: 'black',
    borderWidth: 1.5,
    marginTop: 20,
  },
  promoClipboardText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    margin: 10,
  },
  offerDescriptionContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  offerDescription2: {
    fontFamily: 'open-sans',
    fontSize: 12,
    margin: 5,
    color: 'grey',
  },
  termsTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  termsText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default PromoCodeScreen;

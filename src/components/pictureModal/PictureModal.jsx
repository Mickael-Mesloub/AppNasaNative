import React, {useState} from 'react';
import {Modal, Text, Pressable, View, ScrollView, Image} from 'react-native';
import {COLORS} from '../../constants/theme';

const PictureModal = ({imageData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const transparent = 'rgba(0, 0, 0, 0.5)';

  return (
    <View>
      {Array.isArray(imageData) ? (
        imageData.map(image => (
          <Pressable key={image.date} onPress={() => handleOpenModal(image)}>
            <Image
              source={{uri: image.url}}
              resizeMode="cover"
              style={{width: 100, height: 100}}
            />
          </Pressable>
        ))
      ) : (
        <Pressable onPress={() => handleOpenModal(imageData)}>
          <Image
            source={{uri: imageData.url}}
            resizeMode="cover"
            style={{width: 100, height: 100}}
          />
        </Pressable>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: transparent,
            height: '100%',
            width: '100%',
          }}>
          {selectedImage && (
            <View style={{height: '100%', width: '100%'}}>
              <Image
                source={{uri: selectedImage.url}}
                style={{width: '100%', height: '70%'}}
              />
              <ScrollView>
                <Text style={{color: '#fff'}}>{selectedImage.title}</Text>
                <Text style={{color: '#fff'}}>{selectedImage.date}</Text>
                <Text style={{color: '#fff'}}>{selectedImage.explanation}</Text>
                <Text style={{color: '#fff'}}>{selectedImage.copyright}</Text>
              </ScrollView>
              <Pressable onPress={handleCloseModal}>
                <Text style={{fontSize: 32, color: '#fff'}}>Fermer</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default PictureModal;

import {View, Text, Modal, Image, ScrollView} from 'react-native';
import React from 'react';
import IconButton from '../iconButton/IconButton';

import styles from './ImageModalStyles';
import {COLORS} from '../../constants/theme';

const ImageModal = ({selectedImage, modalVisible, handleCloseModal, share}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.modal}>
        {selectedImage && (
          <View style={styles.modalGlobalWrapper}>
            <View style={styles.modalHeader}>
              <IconButton
                iconOptions={{
                  name: 'arrow-back-outline',
                  size: 36,
                  color: COLORS.primary,
                }}
                onPress={handleCloseModal}
              />
              <Text style={styles.modalPicDate}>{selectedImage.date}</Text>
              <IconButton
                iconOptions={{
                  name: 'share-social',
                  size: 36,
                  color: COLORS.primary,
                }}
                onPress={() => share(selectedImage)}
              />
            </View>
            <Image
              source={{uri: selectedImage.url}}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <ScrollView>
              <View style={styles.modalPicLegendWrapper}>
                <Text style={styles.modalPicTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalPicExplanation}>
                  {selectedImage.explanation}
                </Text>
                <Text style={styles.modalPicLegendText}>
                  {selectedImage.copyright}
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ImageModal;

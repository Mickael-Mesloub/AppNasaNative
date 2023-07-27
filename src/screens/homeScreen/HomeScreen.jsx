import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '@env';
import {styles} from './HomeScreenStyles';
import {GET} from '../../helpers/fetch';
import HomePictureCard from '../../components/cards/homePictureCard/HomePictureCard';
import PictureModal from '../../components/pictureModal/PictureModal';

import {COLORS, SIZES} from '../../constants/theme';
import IconButton from '../../components/iconButton/IconButton';
import {share} from '../../helpers/utils';
import ImageModal from '../../components/modal/ImageModal';

const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const endpoint = '?api_key=';

  // got issues with react-native-dotenv. Temporarily storing env variables here... :(
  const API_URL = 'https://api.nasa.gov/planetary/apod';
  const API_KEY = 'eSxMHMlniHW25NU8dmhu5saDeoVYlraYEw0fEKfb';

  const fetchData = async () => {
    try {
      const data = await GET(`${API_URL}${endpoint}${API_KEY}`);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const handleOpenModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles?.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {data && (
            <>
              <TouchableOpacity onPress={() => handleOpenModal(data)}>
                <HomePictureCard data={data} />
              </TouchableOpacity>
              <ImageModal
                selectedImage={data}
                modalVisible={modalVisible}
                handleCloseModal={handleCloseModal}
                share={() => share(data)}
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

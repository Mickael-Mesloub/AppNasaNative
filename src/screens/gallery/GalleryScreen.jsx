import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET} from '../../helpers/fetch';
// import {API_URL, API_KEY} from '@env';
import {COLORS} from '../../constants/theme';
import {styles} from './GalleryScreenStyles';
import {share} from '../../helpers/utils';
import ImageModal from '../../components/modal/ImageModal';
import IconButton from '../../components/iconButton/IconButton';

const GalleryScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // got issues with react-native-dotenv. Temporarily storing env variables here... :(
  const API_URL = 'https://api.nasa.gov/planetary/apod';
  const API_KEY = 'eSxMHMlniHW25NU8dmhu5saDeoVYlraYEw0fEKfb';

  const endpoints = ['?api_key=', '&start_date=2023-07-20'];

  const fetchData = async () => {
    try {
      const data = await GET(
        `${API_URL}${endpoints[0]}${API_KEY}${endpoints[1]} `,
      );
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

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.galleryPictureWrapper}
          onPress={() => handleOpenModal(item)}>
          <Image
            source={{uri: item?.url}}
            resizeMode="cover"
            style={styles.galleryPicture}
          />
        </TouchableOpacity>
        <ImageModal
          selectedImage={selectedImage}
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          share={() => share(selectedImage)}
        />
      </>
    );
  };

  const handleOpenModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.galleryHeader}>
        <IconButton
          iconOptions={{
            name: 'arrow-back-outline',
            size: 32,
            color: COLORS.primary,
          }}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.galleryHeaderTitle}>Gallery</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
      ) : (
        <View style={styles.galleryWrapper}>
          <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => item?.date + '_key'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GalleryScreen;

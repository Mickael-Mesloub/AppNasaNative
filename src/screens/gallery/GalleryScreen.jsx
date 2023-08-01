import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET} from '../../helpers/fetch';
// import {API_URL, API_KEY} from '@env';
import {COLORS, SIZES} from '../../constants/theme';
import {styles} from './GalleryScreenStyles';
import {formatDate, share} from '../../helpers/utils';
import ImageModal from '../../components/modal/ImageModal';
import IconButton from '../../components/iconButton/IconButton';
import FastImage from 'react-native-fast-image';

const GalleryScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  // got issues with react-native-dotenv. Temporarily storing env variables here... :(
  const API_URL = 'https://api.nasa.gov/planetary/apod';
  const API_KEY = 'eSxMHMlniHW25NU8dmhu5saDeoVYlraYEw0fEKfb';

  const today = new Date();
  const DAY = 86_400_000;

  const fetchData = async (startDate, endDate) => {
    try {
      const data = await GET(
        `${API_URL}?api_key=${API_KEY}&start_date=${formatDate(
          startDate,
        )}&end_date=${formatDate(endDate)}`,
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const updatedStartDate = new Date(today.getTime() - 10 * DAY);
    setNewStartDate(updatedStartDate);
    fetchData(updatedStartDate, today).then(data => {
      if (!data) {
        alert(
          'An error has occurred when trying to load data. Try again later. You are getting redirected...',
        );
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      }
      setData(data.reverse());
      setNewEndDate(new Date(updatedStartDate.getTime() - 1 * DAY));
    });
  }, []);

  const loadMoreItems = () => {
    const updatedStartDate = new Date(newStartDate.getTime() - 10 * DAY);
    setNewStartDate(updatedStartDate);
    fetchData(updatedStartDate, newEndDate).then(newData => {
      if (!newData) {
        alert(
          'An error has occurred when trying to load data. Try again later. You are getting redirected...',
        );
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      }
      setData([...data, ...newData.reverse()]);
      setNewEndDate(new Date(updatedStartDate.getTime() - 1 * DAY));
    });
  };

  // FLATLIST RENDER FUNCTIONS

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.galleryPictureWrapper}
          onPress={() => handleOpenModal(item)}>
          <FastImage
            style={styles.galleryPicture}
            source={{
              uri: item?.url,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
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

  const renderLoader = () => {
    return (
      <View style={styles.loadMoreLoader}>
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
      </View>
    );
  };

  // MODAL WHEN TAPPING AN ITEM

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
        <View style={{padding: SIZES.medium}}>
          <ActivityIndicator size={'large'} color={COLORS.secondary} />
        </View>
      ) : (
        <>
          <View style={styles.galleryPresentationWrapper}>
            <Text style={styles.galleryPresentationTitle}>
              Discover the cosmos!
            </Text>
            <Text style={styles.galleryPresentationExplanation}>
              <Text style={styles.keyword}>Each day</Text> a different image or
              photograph of our fascinating universe is featured, along with a
              brief explanation written by a professional astronomer.
            </Text>
            <Text style={styles.keyword}>
              Tips : Tap an image to see it's details!
            </Text>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              numColumns={2}
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItems}
              onEndReachedThreshold={0.1}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              keyExtractor={item => item?.date}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default GalleryScreen;

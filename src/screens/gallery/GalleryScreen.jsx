import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET} from '../../helpers/fetch';
// import {API_URL, API_KEY} from '@env';
import {COLORS} from '../../constants/theme';
import {styles} from './GalleryScreenStyles';
import DateTimePicker from '../../components/datePicker/DateTimePicker';
import {formatDate, share} from '../../helpers/utils';
import ImageModal from '../../components/modal/ImageModal';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    console.log('SELECTED IMAGE = ' + selectedImage);
  }, [selectedImage]);

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.galleryPictureWrapper}
          onPress={() => handleOpenModal(item)}>
          <Image
            source={{uri: item.url}}
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

  // ******************** ******************** ******************** ******************** ******************** ********************
  // ******************** ********************  WIP - TESTS FOR FILTERING/SORTING DATA ******************** ******************** ***********************
  // ******************** ******************** ******************** **************************************** *********************

  //   Reverses the data order
  const toggleChangeOrder = () => {
    setIsReversed(!isReversed);
  };

  //   Displays the data items from the most recent to older, or the other way
  const displayedData = isReversed ? [...data].reverse() : data;

  //   useEffect(() => {
  //     let testDate = new Date();
  //     testDate.setDate(testDate.getDate() - 2);
  //     const fullDate = formatDate(testDate);

  //     if (data) {
  //       const filteredData = data.filter(item => item.date === fullDate);
  //       setFilteredImages(filteredData);
  //       console.log('FILTERED PICTURE DATE = ' + filteredData);
  //       console.log('FULLDATE =' + fullDate);
  //     }
  //   }, [date]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.filterBar}> */}
      {/********************* ********************  WIP  ********************* ******************** */}

      {/* <DateTimePicker data={data} />
        <Pressable style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>Filter</Text>
        </Pressable>
      </View> */}

      {/* <Pressable onPress={toggleChangeOrder}>
        <Text style={{color: COLORS.primary}}>Toggle order</Text>
      </Pressable> */}

      {/********************* ********************  WIP  ********************* ******************** */}

      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
      ) : (
        <>
          <FlatList
            data={displayedData}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => item.date + '_key'}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Gallery;

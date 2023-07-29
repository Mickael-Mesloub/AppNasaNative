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
// import DateTimePicker from '../../components/datePicker/DateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {formatDate, share} from '../../helpers/utils';
import ImageModal from '../../components/modal/ImageModal';
import IconButton from '../../components/iconButton/IconButton';

const GalleryScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState('Find by date');
  const [startDate, setStartDate] = useState(new Date());
  const [filteredPicture, setFilteredPicture] = useState(null);

  // got issues with react-native-dotenv. Temporarily storing env variables here... :(
  const API_URL = 'https://api.nasa.gov/planetary/apod';
  const API_KEY = 'eSxMHMlniHW25NU8dmhu5saDeoVYlraYEw0fEKfb';
  const endpoints = ['?api_key=', '&start_date=2023-07-20'];

  const fetchData = async (startDateEndpoint, endDateEndpoint) => {
    try {
      const response = await fetch(
        `${API_URL}${endpoints[0]}${API_KEY}&start_date=${formatDate(
          startDateEndpoint,
        )}&end_date=${formatDate(endDateEndpoint)}`,
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(startDate, startDate);
  }, [startDate]);

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

  /* ---------------------------------------------------------- */
  /* ---------------------------------------------------------- */
  /* ---------------------------------------------------------- */

  const onChangeDate = (e, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(!show);
    setStartDate(currentDate);

    const formattedDate = formatDate(currentDate);

    setDateString(formattedDate);
    filterPerDate(currentDate); // filtering the data every time the date is changed
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const filterPerDate = date => {
    if (data) {
      const filteredData = data.filter(item => item.date === formatDate(date));
      setFilteredPicture(filteredData);
    }
  };

  useEffect(() => {
    console.log('THE PICTURE = ' + filteredPicture);
  }, [filteredPicture]);

  //   Reverses the data order
  const toggleChangeOrder = () => {
    setIsReversed(!isReversed);
  };

  //   Displays the data items from the most recent to older, or the other way
  const displayedData = isReversed ? [...data].reverse() : data;

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
      <View style={styles.filterBar}>
        {/* <View style={styles.container}> */}
        <TouchableOpacity
          style={
            dateString === 'Find by date'
              ? styles.pickerWithoutDate
              : styles.pickerWithDate
          }
          onPress={showDatepicker}>
          <Text
            style={
              dateString === 'Find by date'
                ? styles.pickerTextWithoutDate
                : styles.pickerTextWithDate
            }>
            {dateString}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            data !== 'Find by date'
              ? styles.filterBtn
              : styles.filterBtnDisabled
          }
          onPress={() => filterPerDate(startDate)}>
          <Text
            style={
              data !== 'Find by date'
                ? styles.filterBtnText
                : styles.filterBtnTextDisabled
            }>
            Filter
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="startDatePicker"
            minimumDate={new Date(1995, 6, 16)}
            maximumDate={new Date()}
            mode={mode}
            value={startDate}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
      {/* </View> */}

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

export default GalleryScreen;

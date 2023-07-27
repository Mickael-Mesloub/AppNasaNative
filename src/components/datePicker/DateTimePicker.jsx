import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './DatePickerStyles';
import {formatDate} from '../../helpers/utils';

const DatePicker = ({data, onDateChange}) => {
  const [mode, setMode] = useState('date');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startText, setStartText] = useState('Find by date');
  //   const [endText, setEndText] = useState('To');
  const [startDate, setStartDate] = useState(new Date());
  //   const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDate = (event, selectedStartDate) => {
    const currentDate = selectedStartDate || startDate;
    setShowStartPicker(!showStartPicker);
    setStartDate(selectedStartDate);

    const formattedDate = formatDate(currentDate);

    setStartText(formattedDate);
    onDateChange(formattedDate);
  };

  //   const onChangeEndDate = (e, selectedEndDate) => {
  //     const currentDate = selectedEndDate || endDate;
  //     setShowEndPicker(!showEndPicker);
  //     setEndDate(selectedEndDate);

  //     const formattedDate = formatDate(currentDate);

  //     setEndText(formattedDate);
  //   };

  const showPickerMode = (setter, currentMode) => {
    setter(true);
    setMode(currentMode);
  };

  // ******************** ******************** ******************** ******************** ******************** ********************
  // ******************** WIP - TESTS FOR FILTERING/SORTING DATA ******************** ******************** ***********************
  // ******************** ******************** ******************** **************************************** *********************

  const filterPerDate = pickerDate => {
    const filteredPictures = data.filter(item =>
      item.date.includes(pickerDate),
    );
    console.log(filteredPictures);
  };

  onPress = data => {
    data.forEach(item => {
      if (formatDate(startDate) === item.date) {
        console.log(
          `La startDate ${formatDate(startDate)} et la date de l'image ${
            item.date
          } sont les mêmes !`,
        );
      }
      //    else if (formatDate(endDate) === item.date) {
      //     console.log(
      //       `La endDate ${formatDate(endDate)} et la date de l'image ${
      //         item.date
      //       } sont les mêmes !`,
      //     );
      //   }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          startText === 'Find by date'
            ? styles.pickerWithoutDate
            : styles.pickerWithDate
        }
        onPress={() => showPickerMode(setShowStartPicker, 'date')}>
        <Text
          style={
            startText === 'Find by date'
              ? styles.pickerTextWithoutDate
              : styles.pickerTextWithDate
          }>
          {startText}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={
          endText === 'To' ? styles.pickerWithoutDate : styles.pickerWithDate
        }
        onPress={() => showPickerMode(setShowEndPicker, 'date')}>
        <Text
          style={
            endText === 'To'
              ? styles.pickerTextWithoutDate
              : styles.pickerTextWithDate
          }>
          {endText}
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={
          startText !== 'Find by date'
            ? styles.filterBtn
            : styles.filterBtnDisabled
        }
        onPress={() => filterPerDate(data.date)}>
        <Text
          style={
            startText !== 'Find by date'
              ? styles.filterBtnText
              : styles.filterBtnTextDisabled
          }>
          Filter
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          testID="startDatePicker"
          minimumDate={new Date(1995, 6, 16)}
          maximumDate={new Date()}
          mode={mode}
          value={startDate}
          display="default"
          onChange={onChangeStartDate}
        />
      )}
      {/* {showEndPicker && (
        <DateTimePicker
          testID="endDatePicker"
          minimumDate={startDate}
          maximumDate={new Date()}
          mode={mode}
          value={endDate}
          display="default"
          onChange={onChangeEndDate}
        />
      )} */}
    </View>
  );
};

export default DatePicker;

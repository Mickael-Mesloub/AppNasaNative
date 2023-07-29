import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './DatePickerStyles';
import {formatDate} from '../../helpers/utils';
import FilterButton from '../filterButton/FilterButton';

const DatePicker = ({data, onDateChange}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState('Find by date');
  const [startDate, setStartDate] = useState(new Date());
  const [filteredPicture, setFilteredPicture] = useState(null);

  //   const [showEndPicker, setShowEndPicker] = useState(false);
  //   const [endText, setEndText] = useState('To');
  //   const [endDate, setEndDate] = useState(new Date());

  const onChangeDate = (e, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(!show);
    setStartDate(selectedDate);

    const formattedDate = formatDate(currentDate);

    setDateString(formattedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const filterPerDate = date => {
    const filteredData = data.filter(item => item.date === formatDate(date));
    setFilteredPicture(filteredData);
  };

  useEffect(() => {
    console.log(filteredPicture);
  }, [filteredPicture]);

  //   const onChangeEndDate = (e, selectedEndDate) => {
  //     const currentDate = selectedEndDate || endDate;
  //     setShowEndPicker(!showEndPicker);
  //     setEndDate(selectedEndDate);

  //     const formattedDate = formatDate(currentDate);

  //     setEndText(formattedDate);
  //   };

  return (
    <View style={styles.container}>
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
          data !== 'Find by date' ? styles.filterBtn : styles.filterBtnDisabled
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

      {/* <TouchableOpacity
        style={
          endText === 'To' ? styles.pickerWithoutDate : styles.pickerWithDate
        }
        onPress={() => showMode(setShowEndPicker, 'date')}>
        <Text
          style={
            endText === 'To'
              ? styles.pickerTextWithoutDate
              : styles.pickerTextWithDate
          }>
          {endText}
        </Text>
      </TouchableOpacity> */}

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

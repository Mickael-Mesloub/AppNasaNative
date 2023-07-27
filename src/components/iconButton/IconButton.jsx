import {Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = ({iconOptions, onPress}) => {
  return (
    <Pressable hitSlop={10} onPress={onPress}>
      <Icon
        name={iconOptions.name}
        size={iconOptions.size}
        color={iconOptions.color}
      />
    </Pressable>
  );
};

export default IconButton;

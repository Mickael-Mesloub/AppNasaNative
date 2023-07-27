import {Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './ScreenHeaderLogoBtnStyles';

const ScreenHeaderLogoBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <Pressable style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </Pressable>
  );
};

export default ScreenHeaderLogoBtn;

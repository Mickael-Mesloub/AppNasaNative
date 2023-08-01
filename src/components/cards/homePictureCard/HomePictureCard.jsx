import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './HomePictureCardStyles';
import {COLORS, SIZES} from '../../../constants/theme';
import IconButton from '../../iconButton/IconButton';
import {share} from '../../../helpers/utils';

const PictureCard = ({data}) => {
  return (
    <View style={styles.picOfTheDayCard}>
      <View style={styles.picOfTheDayTextsWrapper}>
        <Text style={styles.mainTitle}>Picture Of the Day</Text>

        <Text style={styles.picOfTheDayDate}>{data?.date}</Text>
        <View style={styles.iconWrapper}>
          <IconButton
            iconOptions={{
              name: 'share-social',
              size: SIZES.large,
              color: COLORS.tertiary,
            }}
            onPress={() => share(data)}
          />
        </View>
      </View>
      {data.url ? (
        <>
          <Image
            source={{uri: data?.url}}
            resizeMode="cover"
            style={styles.picOfTheDayImage}
          />
        </>
      ) : (
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
      )}
      <View style={{paddingTop: SIZES.small}}>
        <Text style={styles.picOfTheDayTitle}>{data?.title}</Text>
        <Text style={styles.picOfTheDayCopyright}>
          Copyright: {data?.copyright}
        </Text>
      </View>
    </View>
  );
};

export default PictureCard;

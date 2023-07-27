import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS, SIZES} from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.medium,
  },

  galleryPictureWrapper: {
    flex: 1,
    padding: SIZES.xSmall,
    width: '50%',
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.red,
  },

  galleryPicture: {
    width: '100%',
    height: 250,
    borderRadius: SIZES.xSmall,
  },

  filterBar: {
    padding: SIZES.medium,
    flexDirection: 'row',
  },

  filterBtn: {
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
  },

  filterBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.tertiary,
  },
});

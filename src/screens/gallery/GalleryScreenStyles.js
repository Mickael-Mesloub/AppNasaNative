import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS, SIZES} from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.medium,
    backgroundColor: COLORS.tertiary,
  },

  galleryHeader: {
    paddingHorizontal: SIZES.xSmall,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tertiary,
  },

  galleryHeaderTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    padding: SIZES.small,
    verticalAlign: 'middle',
  },

  galleryPictureWrapper: {
    padding: SIZES.xSmall,
    width: '50%',
    backgroundColor: COLORS.tertiary,
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
});

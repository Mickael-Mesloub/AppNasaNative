import {StyleSheet} from 'react-native';
import {COLORS, FONT, SIZES} from '../../constants/theme';

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
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 62,
  },

  /* ------- DATE PICKER ------ */

  pickerTextWithoutDate: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },

  pickerTextWithDate: {
    color: COLORS.tertiary,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },

  pickerWithoutDate: {
    backgroundColor: COLORS.primaryTransp,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },

  pickerWithDate: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },

  filterBtnDisabled: {
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightGrey,
  },

  filterBtn: {
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
  },

  filterBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.tertiary,
  },

  filterBtnTextDisabled: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.grey,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS, SIZES} from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SIZES.small,
  },

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

  shadowProp: {
    ...SHADOWS.small,
  },

  filterBtn: {
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightGrey,
  },

  filterBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.grey,
  },
});

export default styles;

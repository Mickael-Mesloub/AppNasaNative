import {StyleSheet} from 'react-native';
import {COLORS, FONT, SIZES} from '../../constants/theme';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    height: '100%',
    width: '100%',
  },

  modalGlobalWrapper: {
    height: '100%',
    width: '100%',
  },

  modalHeader: {
    padding: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalImage: {
    width: '100%',
    height: '50%',
  },

  modalPicDate: {
    fontFamily: FONT.semibold,
    fontSize: SIZES.small,
    color: COLORS.tertiary,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
    padding: SIZES.xSmall,
  },

  modalPicLegendWrapper: {
    padding: SIZES.large,
  },

  modalPicTitle: {
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    paddingBottom: SIZES.large,
  },

  modalPicExplanation: {
    color: COLORS.primary,
    fontFamily: FONT.semibold,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },

  modalPicCopyright: {
    color: COLORS.secondary,
    fontFamily: FONT.semiBoldItalic,
    fontSize: SIZES.medium,
    padding: SIZES.medium,
    textAlign: 'center',
  },
});

export default styles;

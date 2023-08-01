import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS, SIZES} from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
  },

  galleryHeader: {
    padding: SIZES.xxSmall,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  galleryHeaderTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.secondary,
    padding: SIZES.small,
    verticalAlign: 'middle',
  },

  // GALLERY PRESENTATION

  galleryPresentationWrapper: {
    padding: SIZES.medium,
    gap: SIZES.xSmall,
  },

  galleryPresentationTitle: {
    fontFamily: FONT.semibold,
    fontSize: SIZES.xxLarge,
    color: COLORS.secondary,
  },

  galleryPresentationExplanation: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },

  keyword: {
    color: COLORS.secondary,
    fontFamily: FONT.semibold,
  },

  // GALLERY ITEMS

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

  loadMoreWrapper: {},

  loadMoreBtn: {
    padding: SIZES.xSmall,
    backgroundColor: COLORS.secondary,
  },

  loadMoreText: {
    fontFamily: FONT.semibold,
    color: COLORS.tertiary,
    fontSize: SIZES.medium,
  },

  loadMoreLoader: {
    marginVertical: SIZES.medium,
    alignItems: 'center',
  },
});

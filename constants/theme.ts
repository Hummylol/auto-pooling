import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#FF6B00',
  secondary: '#FFC107',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#212121',
  border: '#E0E0E0',
  notification: '#FF4081',
  success: '#4CAF50',
  error: '#F44336',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
  darkOverlay: 'rgba(0, 0, 0, 0.5)',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  padding: 16,
  radius: 12,
};

export const FONTS = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  dark: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.background,
    error: COLORS.error,
    text: COLORS.text,
    onSurface: COLORS.text,
    disabled: COLORS.gray,
    placeholder: COLORS.gray,
    backdrop: COLORS.darkOverlay,
    notification: COLORS.notification,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: FONTS.regular,
    },
    medium: {
      fontFamily: FONTS.medium,
    },
    light: {
      fontFamily: FONTS.regular,
    },
    thin: {
      fontFamily: FONTS.regular,
    },
  },
};
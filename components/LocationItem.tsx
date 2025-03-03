import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Location } from '@/types';

interface LocationItemProps {
  location: Location;
  onPress: (location: Location) => void;
  isRecent?: boolean;
}

const LocationItem = ({ location, onPress, isRecent }: LocationItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(location)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={isRecent ? "history" : location.isPopular ? "star" : "location-on"}
          size={24}
          color={isRecent ? COLORS.gray : location.isPopular ? COLORS.secondary : COLORS.primary}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {location.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {location.address}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  address: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default LocationItem;
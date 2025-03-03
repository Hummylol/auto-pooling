import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '@/constants/theme';
import { Pool } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import Button from './Button';

interface PoolCardProps {
  pool: Pool;
  onPress: (pool: Pool) => void;
}

const PoolCard = ({ pool, onPress }: PoolCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress(pool)}
    >
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationTitle}>From</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {pool.source}
            </Text>
          </View>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons name="arrow-forward" size={20} color={COLORS.gray} />
        </View>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color={COLORS.secondary} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationTitle}>To</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {pool.destination}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialIcons name="access-time" size={16} color={COLORS.gray} />
          <Text style={styles.detailText}>
            {format(pool.departureTime, 'h:mm a, MMM d')}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="person" size={16} color={COLORS.gray} />
          <Text style={styles.detailText}>
            {pool.availableSeats} {pool.availableSeats === 1 ? 'seat' : 'seats'} left
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="attach-money" size={16} color={COLORS.gray} />
          <Text style={styles.detailText}>
            ₹{pool.cost} per person
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="star" size={16} color={COLORS.secondary} />
          <Text style={styles.detailText}>
            {pool.driverRating.toFixed(1)} • {pool.driverName}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Book Seat" 
          onPress={() => onPress(pool)} 
          style={styles.bookButton}
          icon="event-seat"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: SIZES.base,
    flex: 1,
  },
  locationTitle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  locationText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  arrow: {
    paddingHorizontal: SIZES.base,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.padding,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
    marginBottom: SIZES.base,
    width: '45%',
  },
  detailText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: SIZES.base / 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookButton: {
    paddingVertical: SIZES.base,
  },
});

export default PoolCard;
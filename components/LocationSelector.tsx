import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { usePooling } from '@/constants/PoolingContext';

interface LocationSelectorProps {
  type: 'source' | 'destination';
  label: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ type, label }) => {
  const router = useRouter();
  const { source, destination } = usePooling();

  const getLocationData = () => {
    return type === 'source' ? source : destination;
  };

  const handlePress = () => {
    router.push(`/mapfolder/${type}`);
  };

  const locationData = getLocationData();

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <MaterialIcons 
          name={type === 'source' ? 'my-location' : 'location-on'} 
          size={24} 
          color={COLORS.primary} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[
          styles.locationText,
          !locationData && styles.placeholderText
        ]}>
          {locationData?.address || 'Select Location'}
        </Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
});

export default LocationSelector;

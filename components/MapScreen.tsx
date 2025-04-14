// MapScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { usePooling } from "../constants/PoolingContext"; // Import the context
import { useRouter } from "expo-router"; // Import useRouter
import { COLORS } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

interface MapScreenProps {
  type: string;
}

const MapScreen: React.FC<MapScreenProps> = ({ type }) => {
  const { setSource, setDestination } = usePooling(); // Use context
  const router = useRouter(); // Initialize the router
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Location.LocationGeocodedAddress[]>([]);

  // Get current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setCurrentLocation(initialRegion);
      setSelectedLocation(location.coords);
      await getAddressFromCoordinates(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const results = await Location.geocodeAsync(query);
        if (results.length > 0) {
          const addresses = await Promise.all(
            results.map(async (result) => {
              const address = await Location.reverseGeocodeAsync({
                latitude: result.latitude,
                longitude: result.longitude,
              });
              return address[0];
            })
          );
          setSearchResults(addresses.filter(Boolean));
        }
      } catch (error) {
        console.error("Error searching location:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const selectSearchResult = async (result: Location.LocationGeocodedAddress) => {
    try {
      const locations = await Location.geocodeAsync(
        `${result.street || ''} ${result.city || ''} ${result.region || ''} ${result.country || ''}`
      );
      
      if (locations.length > 0) {
        const { latitude, longitude } = locations[0];
        setSelectedLocation({ latitude, longitude });
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        await getAddressFromCoordinates(latitude, longitude);
        setSearchQuery("");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  };

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result[0]) {
        const { street, city, region, country } = result[0];
        const formattedAddress = [street, city, region, country]
          .filter(Boolean)
          .join(", ");
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  const handleMapPress = useCallback(async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    await getAddressFromCoordinates(latitude, longitude);
  }, []);

  const confirmLocation = () => {
    if (selectedLocation && address) {
      const locationData = {
        coordinates: `${selectedLocation.latitude},${selectedLocation.longitude}`,
        address: address
      };

      if (type === "source") {
        setSource(locationData);
      } else if (type === "destination") {
        setDestination(locationData);
      }
      router.push('/create');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={searchLocation}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery("");
              setSearchResults([]);
            }}
          >
            <MaterialIcons name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {searchResults.length > 0 && (
        <View style={styles.searchResults}>
          {searchResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchResultItem}
              onPress={() => selectSearchResult(result)}
            >
              <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
              <Text style={styles.searchResultText}>
                {[result.street, result.city, result.region, result.country]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {currentLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={currentLocation}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              description={address}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      )}

      {selectedLocation && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmLocation}
        >
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
  },
  searchResults: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    zIndex: 1,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;

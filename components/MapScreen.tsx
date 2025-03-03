// MapScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { usePooling } from "../constants/PoolingContext"; // Import the context
import { useRouter } from "expo-router"; // Import useRouter

interface MapScreenProps {
  type: string;
}

const MapScreen: React.FC<MapScreenProps> = ({ type }) => {
  const { setSource, setDestination } = usePooling(); // Use context
  const router = useRouter(); // Initialize the router
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = useCallback((event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  }, []);

  const confirmLocation = () => {
    if (selectedLocation) {
      if (type === "source") {
        setSource(`${selectedLocation.latitude}, ${selectedLocation.longitude}`);
      } else if (type === "destination") {
        setDestination(`${selectedLocation.latitude}, ${selectedLocation.longitude}`);
      }
      // Navigate back to CreatePool after confirming the location
      router.push('/create'); // Adjust the path if necessary
    }
  };

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView style={styles.map} initialRegion={currentLocation} onPress={handleMapPress}>
          {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" />}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
      {selectedLocation && (
        <TouchableOpacity style={styles.confirmButton} onPress={confirmLocation}>
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  confirmButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  confirmText: { color: "white", fontWeight: "bold" },
});

export default MapScreen;

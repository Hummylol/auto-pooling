import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MapScreen from '../../components/MapScreen';

export default function MapPage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { type } = params;

  const handleLocationSelect = (locationType: string, location: { latitude: number; longitude: number }) => {
    router.replace({
      pathname: '/create',
      params: {
        selectedType: locationType,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  return <MapScreen type={type as string} onSelect={handleLocationSelect} />;
}

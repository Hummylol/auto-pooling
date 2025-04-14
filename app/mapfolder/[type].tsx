import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import MapScreen from '@/components/MapScreen';

export default function MapPage() {
  const { type } = useLocalSearchParams<{ type: string }>();
  return <MapScreen type={type} />;
} 
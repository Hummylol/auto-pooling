import { Stack } from 'expo-router';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '@/constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PoolingProvider } from '@/constants/PoolingContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLayoutRootView(); // Call the function to hide the splash screen
  }, [onLayoutRootView]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PoolingProvider>
        <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="homescreen/index" />
            <Stack.Screen name="join/index" options={{ title: 'Join Pool' }} />
            <Stack.Screen name="create/index" options={{ title: 'Create Pool' }} />
          </Stack>
        </PaperProvider>
      </PoolingProvider>
    </GestureHandlerRootView>
  );
}

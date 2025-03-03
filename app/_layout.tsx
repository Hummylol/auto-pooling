import { Stack } from 'expo-router';
import { useCallback } from 'react';
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
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PoolingProvider>
      <PaperProvider  theme={theme}>
        <StatusBar style="auto" />
        <Stack  screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
          <Stack.Screen name="index"  />
          <Stack.Screen name="join/index" options={{ title: 'Join Pool' }} />
          <Stack.Screen name="create/index" options={{ title: 'Create Pool' }} />
        </Stack>
      </PaperProvider>
      </PoolingProvider>
    </GestureHandlerRootView>
  );
}

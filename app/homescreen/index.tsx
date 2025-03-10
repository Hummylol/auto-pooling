import React from 'react';
import { StyleSheet, View, Text, ImageBackground, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Button from '@/components/Button';
import { COLORS, SIZES } from '@/constants/theme';

export default function Home() {
  const router = useRouter();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1596456838919-a0c5b8f0c4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.logoContainer}>
              <Text style={styles.appName}>Auto Pool</Text>
              <Text style={styles.tagline}>Share rides, save money</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Join Ride"
                onPress={() => router.push('/join')}
                icon="group"
                style={styles.button}
                textStyle={styles.poptext}
              />
              <Button
                title="Create Ride"
                onPress={() => router.push('/create')}
                variant="secondary"
                icon="add-circle"
                style={styles.button}
                textStyle={styles.createButtonText}
              />
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#fff",
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SIZES.padding * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 4,
  },
  appName: {
    fontFamily: 'Poppins_600SemiBold', // Applied Poppins Bold
    fontSize: SIZES.extraLarge * 1.5,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  tagline: {
    fontFamily: 'Poppins_400Regular', // Applied Poppins Regular
    fontSize: SIZES.medium,
    color: COLORS.black,
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: SIZES.padding * 4,
    gap: SIZES.padding,

  },
  button: {
    paddingVertical: SIZES.padding * 1.2,
    borderRadius: SIZES.radius,
    fontFamily: 'Poppins_400Regular', // Applied Poppins Regular
  },
  createButtonText: {
    fontFamily: 'Poppins_400Regular', // Applied Poppins Regular
    color: COLORS.black,
  },
  poptext:{
    fontFamily: 'Poppins_400Regular', // Applied Poppins Regular
  }
});

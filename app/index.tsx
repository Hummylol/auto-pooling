import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { signUp, login } from "../authService";
import { useRouter } from "expo-router"; 
import { COLORS, FONTS } from '@/constants/theme'; 
import Button from '@/components/Button'; 

const AuthScreen = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    try {
      if (isLoginMode) {
        await login(email, password);
        router.push("/homescreen"); 
      } else {
        await signUp(email, password);
        router.push("/homescreen"); 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message.includes("auth") ? "Invalid credentials. Please try again." : "An error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{isLoginMode ? "Sign In" : "Sign Up"}</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.gray}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.gray}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Sign In / Sign Up Button */}
      <Button
        title={isLoginMode ? "Sign In" : "Sign Up"}
        onPress={handleAuth}
        variant="primary"
        icon={isLoginMode ? "login" : "person-add"}
        style={styles.button}
        textStyle={styles.createButtonText}
      />

      {/* Switch between Sign In / Sign Up */}
      <Button
        title={`Switch to ${isLoginMode ? "Sign Up" : "Sign In"}`}
        onPress={() => setIsLoginMode((prev) => !prev)}
        variant="secondary"
        icon="swap-horiz"
        style={styles.switchButton}
        textStyle={styles.switchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 14,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    backgroundColor: "#F5F5F5",
  },
  error: {
    color: COLORS.error,
    marginBottom: 16,
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
  },
  createButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  switchButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  switchText: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
});

export default AuthScreen;

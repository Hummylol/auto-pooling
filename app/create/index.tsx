// CreatePool.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import DatePicker from "react-native-date-picker";
import { format } from "date-fns";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { usePooling } from "../../constants/PoolingContext"; // Import the context

export default function CreatePool() {
  const router = useRouter();
  const { source, setSource, destination, setDestination } = usePooling(); // Use context
  const [seats, setSeats] = useState("2");
  const [cost, setCost] = useState("");
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSourcePress = () => {
    router.push({
      pathname: "/mapfolder",
      params: { type: "source" },
    });
  };

  const handleDestinationPress = () => {
    router.push({
      pathname: "/mapfolder",
      params: { type: "destination" },
    });
  };

  const validate = () => {
    if (!source) return Alert.alert("Error", "Please select a source location.");
    if (!destination) return Alert.alert("Error", "Please select a destination.");
    if (source === destination) return Alert.alert("Error", "Source and destination cannot be the same.");
    if (!seats || parseInt(seats) < 1 || parseInt(seats) > 3) return Alert.alert("Error", "Seats must be between 1 and 3.");
    if (!cost || isNaN(Number(cost)) || Number(cost) <= 0) return Alert.alert("Error", "Cost must be a valid amount.");
    if (departureTime <= new Date()) return Alert.alert("Error", "Departure time must be in the future.");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Your pool has been created successfully!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Create Pool" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Pool Details</Text>

        {/* Source Selection */}
        <TouchableOpacity onPress={handleSourcePress} activeOpacity={0.7}>
          <FormInput
            label="Source Location"
            placeholder="Select pickup location"
            value={source ?? ""}
            leftIcon="location-on"
            rightIcon="chevron-right"
            editable={false}
          />
        </TouchableOpacity>

        {/* Destination Selection */}
        <TouchableOpacity onPress={handleDestinationPress} activeOpacity={0.7}>
          <FormInput
            label="Destination"
            placeholder="Select drop location"
            value={destination ?? ""}
            leftIcon="location-on"
            rightIcon="chevron-right"
            editable={false}
          />
        </TouchableOpacity>

        <FormInput
          label="Available Seats"
          placeholder="1-3"
          value={seats}
          onChangeText={setSeats}
          leftIcon="event-seat"
          keyboardType="numeric"
          maxLength={1}
        />
        <FormInput
          label="Cost per Passenger (₹)"
          placeholder="Enter amount"
          value={cost}
          onChangeText={setCost}
          leftIcon="attach-money"
          keyboardType="numeric"
        />

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Departure Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {format(departureTime, "MMM d, yyyy h:mm a")}
            </Text>
            <Text style={styles.iconText}>📅</Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={showDatePicker}
          date={departureTime}
          mode="datetime"
          minimumDate={new Date()}
          onConfirm={(date) => {
            setShowDatePicker(false);
            setDepartureTime(date);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        <Button
          title="Create Pool"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  contentContainer: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 3,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  dateContainer: { marginBottom: SIZES.padding },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 50,
  },
  dateText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  iconText: { fontSize: 16 },
  submitButton: { marginTop: SIZES.padding },
});

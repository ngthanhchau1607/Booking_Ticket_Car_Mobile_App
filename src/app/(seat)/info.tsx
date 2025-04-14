import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SeatHeader from "@/components/seat/seat.header";
import SeatFooter from "@/components/seat/seat.footer";
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import { router } from "expo-router";

const Info = () => {
  const insets = useSafeAreaInsets();

  const [passengerName, setPassengerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { date } = useLocation();
  const {
    busCompany,
    departureTime,
    departureDate,
    selectedSeatList,
    totalPrice,
    setContactInfo,
  } = useInfo();

  const activeStep = 4;

  const handleBackPress = () => {
    router.back(); // Hoặc tuỳ theo flow bạn muốn quay lại
  };

  const handleContinue = () => {
    setContactInfo({
      fullName: passengerName,
      email: email,
      phoneNumber: phoneNumber,
    });

    console.log("Form Submitted", { passengerName, phoneNumber, email });
    router.push("/(seat)/infoticket");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <SeatHeader
          busName={busCompany}
          departureTime={departureTime}
          departureDate={departureDate || date}
          activeStep={activeStep}
          onBackPress={handleBackPress}
        />
      </View>

      <View style={[styles.content, { flex: 1 }]}>
        <Text style={styles.title}>Nhập thông tin hành khách:</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên người đi:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên của bạn"
            value={passengerName}
            onChangeText={setPassengerName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      <SeatFooter
        selectedSeats={selectedSeatList}
        totalPrice={totalPrice}
        onContinue={handleContinue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  content: {
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#fff",
  },
});

export default Info;

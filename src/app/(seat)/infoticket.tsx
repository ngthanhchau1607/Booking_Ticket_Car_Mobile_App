import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SeatHeader from "@/components/seat/seat.header";
import SeatFooter from "@/components/seat/seat.footer";
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import { router } from "expo-router";

const InfoTicket = () => {
  const insets = useSafeAreaInsets();
  const { date } = useLocation();

  // Lấy tất cả dữ liệu từ context
  const {
    busCompany,
    departureTime,
    departureDate,
    pickupPoint,
    dropoffPoint,
    selectedSeatList,
    totalPrice,
    contactInfo,
    setContactInfo,
  } = useInfo();

  const activeStep = 5;

  const handleBackPress = () => {
    // Nếu muốn lưu lại contactInfo khi quay lại (tùy bạn)
    setContactInfo(contactInfo);
    console.log("Back pressed", contactInfo);
  };

  const handleContinue = () => {
    // Lưu lại contactInfo trước khi tiếp tục (nếu cần)
    setContactInfo(contactInfo);
    console.log("Form Submitted", contactInfo);
    router.push("/(seat)/payment"); 
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
        <View style={styles.infoContainer}>
          {/* Thông tin chuyến đi */}
          <View style={styles.tripInfoContainer}>
            <Text style={styles.title}>Thông tin chuyến đi:</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Ngày đi:</Text>
              <Text style={styles.infoText}>{departureDate || date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Nhà xe:</Text>
              <Text style={styles.infoText}>{busCompany}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Số ghế đã chọn:</Text>
              <Text style={styles.infoText}>{selectedSeatList.length}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Giờ đi:</Text>
              <Text style={styles.infoText}>{departureTime}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Điểm đón:</Text>
              <Text style={styles.infoText}>{pickupPoint?.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Giờ đón:</Text>
              <Text style={styles.infoText}>{pickupPoint?.time}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Điểm trả:</Text>
              <Text style={styles.infoText}>{dropoffPoint?.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Giờ tới:</Text>
              <Text style={styles.infoText}>{dropoffPoint?.time}</Text>
            </View>
          </View>

          {/* Thông tin liên hệ */}
          <View style={styles.contactInfoContainer}>
            <Text style={styles.title}>Thông tin liên hệ:</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Họ tên:</Text>
              <Text style={styles.infoText}>{contactInfo.fullName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Số điện thoại:</Text>
              <Text style={styles.infoText}>{contactInfo.phoneNumber}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.infoText}>{contactInfo.email}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <SeatFooter
          selectedSeats={selectedSeatList}
          totalPrice={totalPrice}
          onContinue={handleContinue}
        />
      </View>
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
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  footerContainer: {
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tripInfoContainer: {
    marginBottom: 20,
  },
  contactInfoContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    flex: 2,
    textAlign: "right",
  },
});

export default InfoTicket;

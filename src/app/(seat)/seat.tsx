import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getTripPassengerByTripId } from "@/utils/api";
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import SeatHeader from "@/components/seat/seat.header";

const Seat = () => {
    const { date } = useLocation();
    const { idTripPassenger,setSelectedSeatList,setTotalPrice,setListSeat } = useInfo();
    const insets = useSafeAreaInsets();
  
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [tripPassengerCurrent, setTripPassengerCurrent] = useState<any[]>([]);
    const [seatVehicle, setSeatVehicle] = useState<any[]>([]);

    useEffect(() => {
      if (!idTripPassenger) return;
      const fetchTripPassengers = async () => {
        try {
          const res = await getTripPassengerByTripId(idTripPassenger.toString());
          setTripPassengerCurrent(res.data);
          setSeatVehicle(res.data[0].vehicle.seatVehicle);
        } catch (error) {
          console.error("Lỗi khi gọi API getTripPassengerByTripId:", error);
        }
      };
      fetchTripPassengers();
    }, [idTripPassenger]);
  
    const unavailableSeats = seatVehicle.filter((s) => s.status === "đã đặt").map((s) => s.name);
  
    const toggleSeatSelection = (seatName: string) => {
      setSelectedSeats((prev) =>
        prev.includes(seatName) ? prev.filter((s) => s !== seatName) : [...prev, seatName]
      );
    };
  
    const totalPrice = useMemo(() => {
      return selectedSeats.reduce((sum, seatName) => {
        const seat = seatVehicle.find((s) => s.name === seatName);
        return seat ? sum + Number(seat.price) : sum;
      }, 0);
    }, [selectedSeats, seatVehicle]);
  
    const half = Math.ceil(seatVehicle.length / 2);
    const lowerDeckSeats = seatVehicle.slice(0, half);
    const upperDeckSeats = seatVehicle.slice(half);
  
    const renderSeatList = (seats: any[]) => {
      return seats.map((seat: any) => {
        const isUnavailable = seat.status === "đã đặt";
        const isSelected = selectedSeats.includes(seat.name);
        return (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              { backgroundColor: "white" },
              isUnavailable && { backgroundColor: "#f5f5f5" },
              isSelected && { backgroundColor: "#4caf50" },
            ]}
            disabled={isUnavailable}
            onPress={() => toggleSeatSelection(seat.name)}
          >
            {isUnavailable ? (
              <Ionicons name="close" size={24} color="#e53935" />
            ) : (
              <Ionicons
                name="bus-outline"
                size={24}
                color={isSelected ? "white" : "#1e88e5"}
              />
            )}
            <Text
              style={[
                styles.seatText,
                isUnavailable && { color: "#aaa", textDecorationLine: "line-through" },
                isSelected && { color: "white" },
              ]}
            >
              {seat.name}
            </Text>
          </TouchableOpacity>
        );
      });
    };
  
    const busName = tripPassengerCurrent[0]?.passenger?.name || "Xe ABC";
    const departureTime = tripPassengerCurrent[0]?.startTime || "7h:00";
    const departureDate = date || "Thứ 5, 11/04/2025";
  
    const handleBack = () => router.back();
    
    const handleContinue = () => {
      // Cập nhật context khi nhấn "Tiếp tục"
      setSelectedSeatList(selectedSeats); // Cập nhật danh sách ghế đã chọn
      
      // Cập nhật danh sách ID ghế
    const selectedSeatIds = selectedSeats.map(seatName => {
      const seat = seatVehicle.find(s => s.name === seatName);
      return seat?.id; // Có thể undefined nếu không tìm thấy
    }).filter(Boolean); // Loại bỏ undefined (nếu có)

    setListSeat(selectedSeatIds); // ✅ Cập nhật danh sách id ghế vào context

      setTotalPrice(totalPrice); // Cập nhật tổng tiền
      router.push("/(seat)/pickup"); // Chuyển hướng đến trang tiếp theo
    };


    return (
      <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <SeatHeader
                busName={busName}
                departureTime={departureTime}
                departureDate={departureDate}
                activeStep={1} // Set the current step here
                onBackPress={handleBack}
            />
        </View>
  
        {/* Content */}
        <View style={styles.content}>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>❌</Text>
              <Text style={styles.legendText}>Ghế đã đặt</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "white", borderWidth: 1, borderColor: "#ccc" }]} />
              <Text style={styles.legendText}>Ghế trống</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "#4caf50" }]} />
              <Text style={styles.legendText}>Đang chọn</Text>
            </View>
          </View>
  
          {/* Ghế */}
          <View style={styles.seatFrame}>
            <View style={styles.seatColumnSide}>
              <Text style={styles.floorLabel}>Tầng dưới</Text>
              {renderSeatList(lowerDeckSeats)}
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.seatColumnSide}>
              <Text style={styles.floorLabel}>Tầng trên</Text>
              {renderSeatList(upperDeckSeats)}
            </View>
          </View>
        </View>
  
        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.selectedText}>
              {selectedSeats.length > 0
                ? `Đã chọn ${selectedSeats.length} chỗ: ${selectedSeats.join(", ")}`
                : "Chưa chọn chỗ nào"}
            </Text>
            <Text style={styles.totalText}>
              Tổng tiền: {totalPrice.toLocaleString("vi-VN")}đ
            </Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    header: { backgroundColor: "white", paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: "#ddd" },
    headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    backButton: { marginRight: 12 },
    busName: { fontSize: 18, fontWeight: "bold", color: "#1e88e5" },
    timeText: { fontSize: 14, color: "#555", marginTop: 4 },
  
    progressContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    step: { alignItems: "center", flex: 1 },
    stepNumberSmall: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: "#999", textAlign: "center", lineHeight: 20, color: "#999", fontWeight: "bold", fontSize: 12, backgroundColor: "#f0f0f0" },
    activeStep: { borderColor: "#1e88e5", color: "white", backgroundColor: "#1e88e5" },
    stepLabelSmall: { fontSize: 11, marginTop: 4, color: "#888" },
    activeLabel: { color: "#1e88e5", fontWeight: "600" },
    line: { width: 20, height: 1, backgroundColor: "#ccc", marginHorizontal: 4 },
  
    content: { flex: 1, padding: 16 },
  
    legendContainer: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 16 },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    legendIcon: { fontSize: 18 },
    legendText: { fontSize: 13, color: "#444" },
    legendBox: { width: 20, height: 20, borderRadius: 4 },
  
    seatFrame: { backgroundColor: "#fff", padding: 16, marginTop: 30, borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    seatColumnSide: { alignItems: "center", flex: 1 },
    floorLabel: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#1e88e5" },
    verticalDivider: { width: 1, height: "100%", backgroundColor: "#ccc", marginHorizontal: 8 },
  
    seat: { width: 60, height: 60, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 2, borderWidth: 1, borderColor: "#e0e0e0" },
    seatText: { fontSize: 13, color: "#333", marginTop: 4, fontWeight: "600" },
  
    footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: "#ddd", backgroundColor: "white" },
    selectedText: { fontSize: 14, color: "#333", fontWeight: "500" },
    totalText: { fontSize: 16, fontWeight: "bold", color: "#1e88e5", marginTop: 4 },
    continueButton: { backgroundColor: "#1e88e5", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    continueText: { color: "white", fontWeight: "bold", fontSize: 14 },
  });

export default Seat;

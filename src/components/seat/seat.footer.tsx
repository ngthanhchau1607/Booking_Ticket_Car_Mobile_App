// SeatFooter.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SeatFooterProps {
  selectedSeats: string[];
  totalPrice: number;
  onContinue: () => void;
}

const SeatFooter: React.FC<SeatFooterProps> = ({ selectedSeats, totalPrice, onContinue }) => {
  return (
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
      <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  selectedText: { fontSize: 14, color: "#333", fontWeight: "500" },
  totalText: { fontSize: 16, fontWeight: "bold", color: "#1e88e5", marginTop: 4 },
  continueButton: { backgroundColor: "#1e88e5", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  continueText: { color: "white", fontWeight: "bold", fontSize: 14 },
});

export default SeatFooter;

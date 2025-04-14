import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderPage = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"booked" | "canceled">("booked");

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Vé của tôi</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "booked" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("booked")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "booked" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Vé đã đặt
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === "canceled" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("canceled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "canceled" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Vé đã hủy
          </Text>
        </Pressable>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {activeTab === "booked" ? (
          <View style={styles.ticketCard}>
            {/* Khung bên trái: giờ + ngày */}
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>07:30</Text>
              <Text style={styles.dateText}>20/04</Text>
            </View>

            {/* Phần nội dung vé bên phải */}
            <View style={styles.ticketInfo}>
              <Text style={styles.amountText}>320.000 đ</Text>
              <Text style={styles.routeText}>BX Miền Đông → BX Đà Lạt</Text>
              <Text style={styles.busText}>Xe DinhXomBac Express</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>Bạn chưa hủy vé nào.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  activeTab: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  inactiveTab: {
    backgroundColor: "#ffffff",
    borderColor: "#1976d2",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "#1976d2",
  },
  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  ticketCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeBox: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    width: 70,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  ticketInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
  },
  routeText: {
    fontSize: 15,
    color: "#333",
  },
  busText: {
    fontSize: 14,
    color: "#777",
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});

export default OrderPage;

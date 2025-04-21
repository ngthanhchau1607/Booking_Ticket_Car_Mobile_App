import { useCurrentApp } from "@/context/api.context";
import { getTicket } from "@/utils/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderPage = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"booked" | "canceled">("booked");
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  const { appState } = useCurrentApp();
  const userId = appState?.user.id;

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) return;
      try {
        const response = await getTicket(userId);
        setTickets(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API getTicket:", error);
      }
    };

    fetchTickets();
  }, [userId]);

  const filteredTickets = tickets.filter((ticket: any) =>
    activeTab === "booked" ? ticket.status === "pending" : ticket.status === "canceled"
  );

  const renderTicketItem = ({ item }: { item: any }) => {
    const tripDate = new Date(item.createdAt);
    const startTime = item.tripPassengerTicket?.startTime || "00:00:00";
    const formattedTime = startTime.slice(0, 5);
    const formattedDate = `${tripDate.getDate().toString().padStart(2, "0")}/${(tripDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const vehicle = item.tripPassengerTicket?.vehicle;

    // ✅ Lấy tên tỉnh thành thay vì tên điểm
    const pickupPoint = item.tripPassengerTicket?.trip?.from?.province || "Điểm đi";
    const dropoffPoint = item.tripPassengerTicket?.trip?.to?.province || "Điểm đến";

    const handleDetailsPress = () => {
      router.push({
        pathname: "/(ticket)/paid",
        params: { ticketId: item.id },
      });
    };

    return (
      <View style={styles.ticketCard}>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{formattedTime}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.ticketInfo}>
          <Text style={styles.amountText}>{item.totalAmount.toLocaleString()} đ</Text>

          <View style={styles.routeRow}>
            <Text style={styles.routeText}>{pickupPoint}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.routeText}>{dropoffPoint}</Text>
          </View>

          <Text style={styles.busText}>{vehicle?.name || "Tên xe"}</Text>

          <Pressable onPress={handleDetailsPress} style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Chi tiết vé</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Vé của tôi</Text>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tabButton, activeTab === "booked" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("booked")}
        >
          <Text style={[styles.tabText, activeTab === "booked" ? styles.activeTabText : styles.inactiveTabText]}>
            Vé đã đặt
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabButton, activeTab === "canceled" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("canceled")}
        >
          <Text style={[styles.tabText, activeTab === "canceled" ? styles.activeTabText : styles.inactiveTabText]}>
            Vé đã hủy
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {filteredTickets.length > 0 ? (
          <FlatList
            data={filteredTickets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTicketItem}
          />
        ) : (
          <Text style={styles.text}>
            {activeTab === "booked" ? "Bạn chưa đặt vé nào." : "Bạn chưa hủy vé nào."}
          </Text>
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
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  routeText: {
    fontSize: 15,
    color: "#333",
  },
  arrow: {
    marginHorizontal: 6,
    fontSize: 16,
    color: "#1976d2",
  },
  busText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  detailsButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#1976d2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  detailsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});

export default OrderPage;

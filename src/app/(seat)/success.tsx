import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCurrentApp } from "@/context/api.context";
import { useInfo } from "@/context/info.context";
import * as Notifications from "expo-notifications";
import { postTicket } from "@/utils/api";

const Success = () => {
  const insets = useSafeAreaInsets();

  const handleGoHome = () => {
    router.push("/(tabs)/order"); 
  };
  const note = "Ve xe ";
  const { appState } = useCurrentApp();
  const userId = appState?.user.id; 
  const {
    totalPrice,
      idTripPassenger,
      pickupPoint,
      dropoffPoint,
      listSeat
    } = useInfo(); 
  
  // 🧠 Gọi API khi màn hình Success được mở
  useEffect(() => {
    const sendTicketRequest = async () => {
      // Kiểm tra đầy đủ dữ liệu
      if (
        !userId ||
        !pickupPoint?.id ||
        !dropoffPoint?.id ||
        !listSeat.length ||
        !idTripPassenger
      ) {
        console.warn("Thiếu thông tin để gửi vé.");
        return;
      }
  
      try {
        // Format lại listSeat đúng định dạng { id: number }[]
        const formattedSeatList = listSeat.map((id: string | number) => ({
          id: Number(id),
        }));
  
        const res = await postTicket(
          note,
          totalPrice,
          Number(userId),
          Number(idTripPassenger),
          Number(pickupPoint.id),
          Number(dropoffPoint.id),
          formattedSeatList
        );
  
        console.log("Đặt vé thành công:", res.data);

        // 🛎️ Gửi thông báo ngay sau khi đặt vé thành công
await Notifications.scheduleNotificationAsync({
  content: {
    title: "🎫 Vé đã được đặt!",
    body: "Chúc bạn có chuyến đi vui vẻ và an toàn!",
    sound: "default",
  },
  trigger: null, // Gửi ngay lập tức
});

      } catch (error) {
        console.error("Lỗi khi đặt vé:", error);
        Alert.alert("Lỗi", "Không thể đặt vé. Vui lòng thử lại sau.");
      }
    };
  
    sendTicketRequest();
  }, [userId, pickupPoint, dropoffPoint, listSeat, totalPrice, idTripPassenger]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
         <Image
        source={require("@/assets/tichxanh.png")} 
        style={styles.image}
      />
      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.description}>
        Cảm ơn bạn đã đặt vé. Chúc bạn có một chuyến đi an toàn và vui vẻ! 🎉
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Về trang vé của tôi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e88e5",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Success;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SeatHeader from "@/components/seat/seat.header";
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import { router } from "expo-router";
import { postPayment, checkStatus } from "@/utils/api";
import QRCode from "react-native-qrcode-svg";


const Payment = () => {
  const insets = useSafeAreaInsets();
  const { date } = useLocation();
  const {
    busCompany,
    departureTime,
    departureDate,
    totalPrice,
  } = useInfo(); 



  const activeStep = 6;

  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút
  const [loading, setLoading] = useState(true);

  const handleBackPress = () => {
    router.back();
  };

  const handleCancelTicket = () => {
    Alert.alert("Hủy vé", "Bạn có chắc muốn hủy vé?", [
      { text: "Không" },
      // { text: "Có", onPress: () => router.push("/(seat)/cancel") },
    ]);
  };

  // Đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Gửi yêu cầu thanh toán và nhận QR
  useEffect(() => {
    const sendPaymentRequest = async () => {
      try {
        setLoading(true);
        const response = await postPayment(totalPrice.toString(), busCompany);
        const qrData = response.data?.qrCode || response.data?.payUrl;
        if (qrData) {
          setQrCodeData(qrData);
          console.log("✅ Nhận mã QR:", qrData);
        } else {
          console.warn("⚠ Không có QR code hoặc URL trong response");
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi postPayment:", error);
        Alert.alert("Lỗi", "Không thể tạo thanh toán. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    if (totalPrice && busCompany) {
      sendPaymentRequest();
    }
  }, [totalPrice, busCompany]);

  // Kiểm tra trạng thái thanh toán tự động sau mỗi 5 giây
  useEffect(() => {
    if (!qrCodeData) return;

    const interval = setInterval(async () => {
      try {
        const response = await checkStatus();
        if (response.data?.isPaid) {
          clearInterval(interval);
          router.push("/success");
        } else {
          console.log("🕐 Chưa thanh toán...");
        }
      } catch (error) {
        console.error("❌ Lỗi kiểm tra trạng thái:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [qrCodeData]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

      <View style={styles.content}>
        <Text style={styles.title}>Thanh toán MoMo bằng mã QR</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#1e88e5" />
        ) : qrCodeData ? (
          <>
            <QRCode value={qrCodeData} size={220} />
            <Text style={styles.note}>Quét mã bằng MoMo để thanh toán</Text>

            <Text style={styles.countdownText}>
              Thời gian còn lại: {formatTime(timeLeft)}
            </Text>

            <Text style={styles.paymentText}>
              Tổng tiền:{" "}
              <Text style={styles.totalPrice}>
                {totalPrice.toLocaleString()} đ
              </Text>
            </Text>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTicket}>
              <Text style={styles.buttonText}>Hủy vé</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.note}>Không thể hiển thị mã QR. Vui lòng thử lại.</Text>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  countdownText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e53935",
    marginTop: 24,
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
  },
  totalPrice: {
    fontWeight: "700",
    color: "#1e88e5",
  },
  note: {
    fontSize: 14,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 16,
    backgroundColor: "#e53935",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Payment;

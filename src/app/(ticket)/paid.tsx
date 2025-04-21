import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Rating } from "react-native-ratings";
import { getTickerById, postComment, postRate } from "@/utils/api";
import { useCurrentApp } from "@/context/api.context";

const PaidTicketDetailPage = () => {
  const [ticketDetail, setTicketDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { appState } = useCurrentApp();
  const userId = appState?.user.id; 

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { ticketId } = useLocalSearchParams();

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const id = Array.isArray(ticketId) ? ticketId[0] : ticketId;
        const response = await getTickerById(id);
        setTicketDetail(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API getTickerById:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetail();
  }, [ticketId]);

  const handleSubmitReview = async () => {
    // Kiểm tra nếu userId hoặc passengerId là undefined
    if (!userId) {
      alert("Thông tin người dùng không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }
  
    const passengerId = ticketDetail?.tripPassengerTicket?.passengerId;
    if (!passengerId) {
      alert("Không tìm thấy thông tin hành khách.");
      return;
    }
  
    try {
      // Gửi đánh giá
      const rateResponse = await postRate(rating, userId, passengerId);
      console.log("Đánh giá đã gửi:", rateResponse);
  
      // Gửi bình luận
      const commentResponse = await postComment(comment, userId, passengerId);
      console.log("Bình luận đã gửi:", commentResponse);
  
      // Sau khi gửi thành công, bạn có thể hiển thị thông báo thành công
      alert("Đánh giá và bình luận của bạn đã được gửi thành công!");
  
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá và bình luận:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  if (!ticketDetail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không tìm thấy thông tin vé.</Text>
      </View>
    );
  }

  const {
    totalAmount,
    createdAt,
    tripPassengerTicket,
    ticketPointId,
    user,
  } = ticketDetail;

  const vehicle = tripPassengerTicket?.vehicle;
  const tripDate = tripPassengerTicket?.trip?.startTime;

  const formattedDate = createdAt
  ? new Date(createdAt).toLocaleDateString("vi-VN")
  : "Không rõ";

  const pickup = ticketPointId?.find((p:any) => p.typePoint === "pickup");
  const dropoff = ticketPointId?.find((p:any) => p.typePoint === "dropoff");

  const pickupTime = pickup?.timepointTicket?.time?.slice(0, 5) || "Không rõ";
  const pickupAddress = pickup?.timepointTicket?.point?.address || "Không rõ";

  const dropoffTime = dropoff?.timepointTicket?.time?.slice(0, 5) || "Không rõ";
  const dropoffAddress = dropoff?.timepointTicket?.point?.address || "Không rõ";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <View style={{ flex: 1 }}>
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết vé</Text>
        </View>

        {/* Thông tin vé */}
        <View style={[styles.ticketInfoContainer, { marginTop: 20 }]}>
          <Text style={styles.infoTitle}>Thông tin vé</Text>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Ngày đi:</Text>
            <Text style={styles.ticketValue}>{formattedDate}</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Nhà xe:</Text>
            <Text style={styles.ticketValue}>
              {vehicle?.name || "Tên xe không có"}
            </Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Điểm đón:</Text>
            <Text style={styles.ticketValue}>
              {`${pickupTime} - ${pickupAddress}`}
            </Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Điểm trả:</Text>
            <Text style={styles.ticketValue}>
              {`${dropoffTime} - ${dropoffAddress}`}
            </Text>
          </View>

        
        </View>

        {/* Thông tin liên hệ */}
        <View style={[styles.contactInfoContainer, { marginTop: 20 }]}>
          <Text style={styles.infoTitle}>Thông tin liên hệ</Text>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Tên:</Text>
            <Text style={styles.ticketValue}>{user?.name || "Không rõ"}</Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Số điện thoại:</Text>
            <Text style={styles.ticketValue}>
              {user?.numberPhone || "Không rõ"}
            </Text>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketLabel}>Email:</Text>
            <Text style={styles.ticketValue}>{user?.email || "Không rõ"}</Text>
          </View>
        </View>

        {/* Đánh giá */}
        <View style={[styles.ratingContainer, { marginTop: 20 }]}>
          <Text style={styles.infoTitle}>Đánh giá</Text>

          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            startingValue={rating}
            onFinishRating={setRating}
          />

          <TextInput
            style={styles.commentInput}
            placeholder="Nhập bình luận..."
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitReview}
          >
            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  ticketInfoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1976d2",
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ticketLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  ticketValue: {
    fontSize: 16,
    color: "#555",
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  commentInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PaidTicketDetailPage;

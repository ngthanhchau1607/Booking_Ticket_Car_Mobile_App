import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Khai báo kiểu dữ liệu cho bình luận
interface Comment {
    id: string;
    username: string;
    comment: string;
    rating: number;
}

// Dữ liệu các bình luận (dữ liệu giả định)
const comments: Comment[] = [
    {
        id: "1",
        username: "Nguyễn Văn A",
        comment: "Bến xe sạch sẽ, nhân viên thân thiện, dễ dàng tìm thấy các tuyến xe.",
        rating: 4,
    },
    {
        id: "2",
        username: "Trần Thị B",
        comment: "Mới xây lại rất đẹp, khu vực mua vé gọn gàng, nhưng còn thiếu dịch vụ ăn uống.",
        rating: 3,
    },
    {
        id: "3",
        username: "Lê Minh C",
        comment: "Bến xe rất thuận tiện, nhiều chuyến xe, nhưng cần cải thiện chỗ đỗ xe cho khách.",
        rating: 5,
    },
];

// Hàm tính tổng sao trung bình
const calculateAverageRating = (comments: Comment[]): number => {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return parseFloat((totalRating / comments.length).toFixed(1)); // Làm tròn tới 1 chữ số thập phân
};

const MienDong: React.FC = () => {
    const averageRating = calculateAverageRating(comments);

    return (
        <View style={styles.container}>
            {/* Tiêu đề và hình ảnh */}
            <Image source={require("@/assets/station/miendong.jpg")} style={styles.image} />
            <Text style={styles.title}>Bến Xe Miền Đông Mới</Text>

            {/* Đánh giá tổng sao */}
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Đánh giá tổng: {averageRating} / 5</Text>
                <View style={styles.stars}>
                    {[...Array(5)].map((_, index) => (
                        <MaterialIcons
                            key={index}
                            name={index < averageRating ? "star" : "star-border"}
                            size={24}
                            color="#fbc02d"
                        />
                    ))}
                </View>
            </View>

            {/* Nội dung mô tả bến xe */}
            <Text style={styles.content}>
                Bến xe Miền Đông Mới là một trong những bến xe lớn và hiện đại tại TP.HCM. Bến xe được xây dựng
                mới với diện tích rộng lớn, sạch sẽ và tiện nghi. Tại đây, hành khách có thể dễ dàng tìm thấy
                các chuyến xe đi các tỉnh miền Đông và miền Tây, với các tiện ích như khu vực chờ, phòng vệ sinh
                sạch sẽ, và các dịch vụ hỗ trợ hành khách. Tuy nhiên, bến xe cần cải thiện một số vấn đề về
                dịch vụ ăn uống và khu vực đỗ xe cho khách.

                Mặc dù vậy, Bến xe Miền Đông Mới vẫn là một điểm đến lý tưởng cho hành khách di chuyển đi các tỉnh.
            </Text>

            {/* Bình luận */}
            <Text style={styles.commentTitle}>Bình luận từ khách hàng:</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentUser}>{item.username}</Text>
                        <View style={styles.stars}>
                            {[...Array(5)].map((_, index) => (
                                <MaterialIcons
                                    key={index}
                                    name={index < item.rating ? "star" : "star-border"}
                                    size={18}
                                    color="#fbc02d"
                                />
                            ))}
                        </View>
                        <Text style={styles.comment}>{item.comment}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f7fa",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        color: "#333",
    },
    ratingContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 16,
        color: "#333",
    },
    stars: {
        flexDirection: "row",
        marginTop: 5,
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
        lineHeight: 22,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    commentContainer: {
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    commentUser: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    comment: {
        marginTop: 5,
        fontSize: 14,
        color: "#555",
    },
});

export default MienDong;

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useLocation } from "@/context/search.context";
import { getAllTripByUser } from "@/utils/api";
import { useTrip } from "@/context/trip.context";

// Hàm chuyển đổi ngày (chỉ sử dụng cho việc gửi dữ liệu)
const formatDateForSend = (date: string) => {
    const parts = date.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    // Trả về định dạng yyyy-mm-dd
    return `${year}-${month}-${day}`;
};

const BannerHome = () => {
    const { departure, destination ,date} = useLocation();
    const { setTripData } = useTrip();  // Sử dụng hook để lấy setTripData từ TripContext
    const router = useRouter();

    useEffect(() => {
    }, [departure, destination, date]);

    const handleNavigateToSearch = (type: string) => {
        if (type === "departure") {
            router.push("/search");
        } else if (type === "destination") {
            router.push("/searchto");
        }
    };

    const handleNavigateToDate = () => {
        router.push("/(search)/date");
    };

    const handleSearch = async () => {
        // Kiểm tra nếu bất kỳ ô input nào chưa được điền thông tin
        if (departure === "Nơi xuất phát" || !departure) {
            Alert.alert("Thông báo", "Vui lòng chọn nơi xuất phát.");
        } else if (destination === "Nơi đến" || !destination) {
            Alert.alert("Thông báo", "Vui lòng chọn nơi đến.");
        } else if (date === "Ngày đi" || !date) {
            Alert.alert("Thông báo", "Vui lòng chọn ngày đi.");
        } else {
            // Gọi API với dữ liệu đã được định dạng
            const formattedDate = formatDateForSend(date);  // Định dạng ngày đi 
            console.log("check data ", departure,destination,formattedDate)
    
            try {
                // Gọi API để lấy dữ liệu chuyến đi
                const response = await getAllTripByUser(departure, destination, formattedDate);
                console.log("Kết quả chuyến đi:", response.data);
    
                // Lưu kết quả vào context nếu có dữ liệu
                if (response.data && response.data.length > 0) {
                    setTripData(response.data);  // Lưu vào context
                    router.push("/(search)/result");
                } 
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                Alert.alert("Lỗi", "Có lỗi xảy ra khi tìm kiếm chuyến đi.");
            }
            finally{
                router.push("/(search)/result");
            }
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.tabs}>
                    {/* Xe khách */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="bus-outline" size={24} color="#1e88e5" />
                        <Text style={[styles.tab, styles.activeTab]}>Xe khách</Text>
                    </View>

                    {/* Máy bay */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="airplane-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Máy bay</Text>
                    </View>

                    {/* Tàu hỏa */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="train-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Tàu hỏa</Text>
                    </View>

                    {/* Thuê xe */}
                    <View style={styles.tabContainer}>
                        <Ionicons name="car-outline" size={24} color="#777" />
                        <Text style={styles.tab}>Thuê xe</Text>
                    </View>
                </View>

                {/* Nơi xuất phát */}
                <TouchableOpacity style={styles.inputRow} onPress={() => handleNavigateToSearch('departure')}>
                    <MaterialIcons name="my-location" size={24} color="#1e88e5" />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>{departure}</Text>
                    </View>
                </TouchableOpacity>

                {/* Nơi đến */}
                <TouchableOpacity style={styles.inputRow} onPress={() => handleNavigateToSearch('destination')}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={24}
                        color="red"
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>{destination}</Text>
                    </View>
                </TouchableOpacity>

                {/* Ngày đi */}
                <TouchableOpacity style={styles.inputRow} onPress={handleNavigateToDate}>
                    <Ionicons name="calendar-outline" size={24} color="#1e88e5" />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>{date}</Text>
                    </View>
                </TouchableOpacity>

                {/* Nút tìm kiếm */}
                <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
                    <Text style={{ color: "black" }}>Tìm kiếm</Text>
                </Button>
            </Card.Content>
        </Card>
    );
};

// Styles
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    tabContainer: {
        alignItems: "center",
    },
    tab: {
        fontSize: 14,
        color: "#777",
        padding: 8,
    },
    activeTab: {
        fontWeight: "bold",
        color: "#1e88e5",
        borderBottomWidth: 2,
        borderBottomColor: "#1e88e5",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#1e88e5", // Màu sắc của đường viền
        borderRadius: 8, // Làm tròn các góc
        padding: 8, // Khoảng cách giữa text và đường viền
        marginLeft: 10, // Khoảng cách với biểu tượng
        flex: 1, // Đảm bảo ô input chiếm hết chiều rộng
        minHeight: 40, // Đảm bảo độ cao tối thiểu cho ô input
        justifyContent: "center", // Căn giữa nội dung trong ô
    },
    inputText: {
        fontSize: 16,
        color: "#333", // Màu chữ
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    searchButton: {
        backgroundColor: "#fdd835",
        marginTop: 15,
        borderRadius: 10,
    },
});

export default BannerHome;

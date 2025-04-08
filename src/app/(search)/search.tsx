import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list"; // Import FlashList
import { getfromProvince } from "@/utils/api";
import { useLocation } from "@/context/search.context";

const removeVietnameseAccent = (str: string) => {
    return str
        .normalize("NFD") // Tách dấu ra khỏi chữ cái
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
        .replace(/Đ/g, "D") // Chuyển Đ -> D
        .replace(/đ/g, "d") // Chuyển đ -> d
        .replace(/ê/g, "e") // Chuyển đ -> d
        .replace(/[^\w\s]/g, "") // Xóa ký tự đặc biệt (nếu có)
        .trim(); // Xóa khoảng trắng thừa
};

const Search = () => {
    const navigation = useNavigation();
    const { setDeparture } = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [provinces, setProvinces] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleProvincePress = (province: string) => {
        setDeparture(province);
        navigation.goBack();
    };

    // Hàm gọi API để lấy danh sách các tỉnh
    const fetchProvinces = async () => {
        setLoading(true);
        try {
            const response = await getfromProvince();
            const provinceData = response.data.map((province: any) => province.name);
            setProvinces(provinceData);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tỉnh: ", error);
            Alert.alert("Lỗi", "Không thể tải danh sách tỉnh.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi API chỉ một lần khi component mount
    useEffect(() => {
        fetchProvinces();
    }, []);

    const removePrefix = (province: string) => {
        if (province.startsWith("Tỉnh ")) {
            return province.slice(5);
        }
        if (province.startsWith("Thành phố ")) {
            return province.slice(10);
        }
        return province;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Nút GoBack */}
                <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                {/* Tiêu đề */}
                <Text style={styles.headerTitle}>Nơi xuất phát</Text>
            </View>

            {/* Thanh tìm kiếm */}
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm tỉnh"
                value={searchTerm}
                onChangeText={setSearchTerm} // Cập nhật giá trị khi người dùng thay đổi
            />

            {/* Danh sách tỉnh */}
            <FlashList
    data={provinces
        .map(removePrefix) // Loại bỏ "Tỉnh" hoặc "Thành phố"
        .filter((province) =>
            removeVietnameseAccent(province)
                .toLowerCase()
                .includes(removeVietnameseAccent(searchTerm).toLowerCase()) // So sánh không dấu
        )
    }
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleProvincePress(item)}>
            <View style={styles.provinceItem}>
                <Text style={styles.provinceText}>{item}</Text>
            </View>
        </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()} // Dùng index làm key
    refreshing={loading}
    onRefresh={fetchProvinces}
/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    goBackButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 10,
    },
    provinceItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    provinceText: {
        fontSize: 16,
    },
});

export default Search;

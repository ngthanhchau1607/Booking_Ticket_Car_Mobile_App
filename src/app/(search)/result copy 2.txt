import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BusCompanyModal from "@/components/modal/bus.modal";
import TimeModal from "@/components/modal/time.modal"; // Import modal giờ đi
import SortModal from "@/components/modal/sort.modal"; // Import modal sắp xếp
import FilterModal from "@/components/modal/filter.modal"; // Import modal lọc

const busCompanies = [
    { name: "Tài Phát", rating: 4.8 },
    { name: "VIP Express", rating: 4.5 },
    { name: "Queen Bus", rating: 4.2 },
    { name: "Royal Limousine", rating: 4.9 }
];

const ResultSearch: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [busModalVisible, setBusModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);  // Để điều khiển modal giờ đi
    const [sortModalVisible, setSortModalVisible] = useState(false);  // Điều khiển modal sắp xếp
    const [filterModalVisible, setFilterModalVisible] = useState(false);  // Điều khiển modal lọc
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<number>(0); // Giá trị giờ đi
    const [timeOption, setTimeOption] = useState<string>("default"); // Giờ đi mặc định, sớm nhất, muộn nhất
    const [sortOption, setSortOption] = useState<string>("default"); // Giá trị sắp xếp

    const handleApplySort = (sortOption: string) => {
        setSortOption(sortOption);
        setSortModalVisible(false);  // Đóng modal khi áp dụng
    };

    const handleApply = (selected: string[]) => {
        setSelectedCompanies(selected);
        setBusModalVisible(false);  // Đóng modal khi áp dụng
    };

    const handleClear = () => {
        setSelectedCompanies([]);  // Xóa lựa chọn
        setBusModalVisible(false);  // Đóng modal khi xóa lọc
    };

    const handleApplyFilter = (filters: { pickup: string; dropoff: string; busType: string }) => {
        // Áp dụng bộ lọc và đóng modal
        console.log(filters); // Ví dụ: có thể xử lý bộ lọc ở đây
        setFilterModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Kết quả tìm kiếm</Text>
            </View>

            {/* Bộ lọc */}
            <View style={styles.filterBar}>
                <TouchableOpacity style={styles.filterItem} onPress={() => setBusModalVisible(true)}>
                    <Ionicons name="bus-outline" size={18} color="#555" style={styles.filterIcon} />
                    <Text style={styles.filterText}>Nhà xe</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => setTimeModalVisible(true)}>
                    <Ionicons name="time-outline" size={18} color="#555" style={styles.filterIcon} />
                    <Text style={styles.filterText}>Giờ đi</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => setSortModalVisible(true)}>
                    <Ionicons name="options-outline" size={18} color="#555" style={styles.filterIcon} />
                    <Text style={styles.filterText}>Sắp xếp</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterItem} onPress={() => setFilterModalVisible(true)}>
                    <Ionicons name="filter-outline" size={18} color="#555" style={styles.filterIcon} />
                    <Text style={styles.filterText}>Lọc</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Gọi Modal Nhà Xe */}
            <BusCompanyModal
                visible={busModalVisible}
                onClose={() => setBusModalVisible(false)}
                companies={busCompanies}
                selectedCompanies={selectedCompanies}
                onApply={handleApply}
                onClear={handleClear}
                onSelect={setSelectedCompanies}  // Truyền onSelect để cập nhật lựa chọn
            />
            {/* Gọi Modal Giờ đi */}
            <TimeModal
                visible={timeModalVisible}
                onClose={() => setTimeModalVisible(false)}
                selectedTime={selectedTime}
                onApply={(time, option) => {
                    setSelectedTime(time);
                    setTimeOption(option);
                    setTimeModalVisible(false);
                }}
                onClear={() => {
                    setSelectedTime(0);
                    setTimeOption("default");
                    setTimeModalVisible(false);
                }}
            />
            {/* Gọi Modal Sắp xếp */}
            <SortModal
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                onApply={handleApplySort}
            />
            {/* Gọi Modal Lọc */}
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16 },
    backButton: { paddingRight: 16 },
    title: { fontSize: 18, fontWeight: "bold" },
    filterBar: { flexDirection: "row", padding: 16, backgroundColor: "#fff" },
    filterItem: { flexDirection: "row", alignItems: "center", flex: 1 },
    filterIcon: { marginRight: 8 },
    filterText: { fontSize: 16, flex: 1 },
});

export default ResultSearch;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useTrip } from "@/context/trip.context";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTripPassenger } from "@/context/trippassenger.context";
import BusCard from "@/components/search/buscard";
import { getTripPassengerByTripId } from "@/utils/api";
import { router } from "expo-router";
import BusCompanyModal from "@/components/modal/bus.modal";
import TimeModal from "@/components/modal/time.modal"; 
import SortModal from "@/components/modal/sort.modal";
import FilterModal from "@/components/modal/filter.modal";

dayjs.extend(customParseFormat);

const ResultSearch = () => {
  const insets = useSafeAreaInsets();
  const { trips, setTripData } = useTrip(); 
  const { tripPassengers, setTripPassengers } = useTripPassenger(); 
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimePassed, setLoadingTimePassed] = useState(false); 

  const [busModalVisible, setBusModalVisible] = useState(false);
  const [busCompanies, setBusCompanies] = useState<string[]>([]);


  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const [timeModalVisible, setTimeModalVisible] = useState(false); 
  const [timeOption, setTimeOption] = useState<string>("default");
  
  const [sortModalVisible, setSortModalVisible] = useState(false);  
  const [sortOption, setSortOption] = useState<string>("default"); 
  
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
const [filterOptions, setFilterOptions] = useState({
  pickup: "",
  dropoff: "",
  busType: ""
});

  const handleApplySort = (option: string) => {
    setSortOption(option);
    setSortModalVisible(false);
  };

  const handleApply = (selected: string[]) => {
    setSelectedCompanies(selected);
    setBusModalVisible(false);
  };

  const handleClear = () => {
    setSelectedCompanies([]);
    setBusModalVisible(false);
  };

  const handleApplyTime = (time: number, option: string) => {
    setTimeOption(option);
    setTimeModalVisible(false);
  };

  const handleClearTime = () => {
    setTimeOption("default");

  };

  const animationValue = useRef(new Animated.Value(-100)).current;  
  const isFirstRender = useRef(true);
  const hasTrips = trips && trips.length > 0;

  useEffect(() => {
    const fetchAllTripPassengers = async () => {
      if (hasTrips && isFirstRender.current) {
        const tripIds = trips.map((trip) => trip.id);
        const allTripPassengers: any[] = [];

        for (const tripId of tripIds) {
          try {
            const response = await getTripPassengerByTripId(tripId.toString()); 
            allTripPassengers.push(...response.data); 
          } catch (error) {
            console.error(`Lỗi khi gọi API cho chuyến đi ${tripId}:`, error);
          }
        }

        setTripPassengers(allTripPassengers);
        setIsLoading(false);
        isFirstRender.current = false;
      } else {
        setIsLoading(false);
      }
    };

    fetchAllTripPassengers();
  }, [hasTrips, trips, setTripPassengers]);

  useEffect(() => {
    if (tripPassengers && tripPassengers.length > 0) {
      const companies = tripPassengers.map(item => item.passenger?.name);
      const uniqueCompanies = [...new Set(companies)];
      setBusCompanies(uniqueCompanies);
    }
  }, [tripPassengers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimePassed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 300,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isLoading]);

  const handleBack = () => {
    setTripData([]);
    setTripPassengers([]);
    router.replace("/(tabs)");
  };

  const filteredAndSortedTrips = useMemo(() => {
    const filtered = (tripPassengers ?? []).filter(
      (item) =>
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(item.passenger?.name)
    );
  
    console.log("🧪 Lọc xong, trước khi sắp xếp:");
    filtered.forEach(item => {
      console.log(`Trip ID: ${item.id}, startTime: ${item.startTime}, typeof: ${typeof item.startTime}`);
    });
  
    const sorted = filtered.sort((a, b) => {
      const timeA = dayjs(a.startTime, "HH:mm:ss").valueOf();
      const timeB = dayjs(b.startTime, "HH:mm:ss").valueOf();
  
      console.log(`📊 So sánh ${a.startTime} (${timeA}) với ${b.startTime} (${timeB})`);
  
      if (timeOption === "earliest") {
        return timeA - timeB;
      }
      if (timeOption === "latest") {
        return timeB - timeA;
      }
      return 0;
    });
  
    console.log("✅ Danh sách startTime sau khi lọc và sắp xếp:");
    sorted.forEach((item) =>
      console.log(`Trip ID: ${item.id} - Start Time: ${item.startTime}`)
    );
  
    return sorted;
  }, [tripPassengers, selectedCompanies, timeOption]);

  if (isLoading && !loadingTimePassed) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fa" }}>
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        <Animated.View style={[styles.car, { transform: [{ translateX: animationValue }] }]}>
          <Ionicons name="car-sport-outline" size={40} color="black" />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách chuyến xe</Text>
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterItem} onPress={() => setBusModalVisible(true)}>
          <Ionicons name="bus-outline" size={18} color="#555" style={styles.filterIcon} />
          <Text style={styles.filterText}>Nhà xe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem} onPress={() => setTimeModalVisible(true)}>
          <Ionicons name="time-outline" size={18} color="#555" style={styles.filterIcon} />
          <Text style={styles.filterText}>Giờ đi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}onPress={() => setSortModalVisible(true)}>
          <Ionicons name="options-outline" size={18} color="#555" style={styles.filterIcon} />
          <Text style={styles.filterText}>Sắp xếp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter-outline" size={18} color="#555" style={styles.filterIcon} />
          <Text style={styles.filterText}>Lọc</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách */}
      <View style={styles.content}>
        {filteredAndSortedTrips.length > 0 ? (
          <FlashList
            data={filteredAndSortedTrips}
            renderItem={({ item }) => {
              const availableSeats = item.vehicle?.seatVehicle?.filter(seat => seat.status === "chưa đặt").length;
              return (
                <BusCard
                  departureTime={item.startTime}
                  arrivalTime={item.endTime}
                  departureLocation={item.trip?.from?.name}
                  arrivalLocation={item.trip?.to?.name}
                  vehicle={item.passenger?.name}
                  vehicleType={item.passenger?.description}
                  vehicleImage={require("@/assets/xe.jpg")}
                  availableSeats={availableSeats}
                  rating={5.0}
                  newPrice={item.passenger?.price}
                  onSelect={() => alert("clicked")}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={200}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <View style={styles.noTripsContainer}>
            <Ionicons name="sad-outline" size={50} color="#888" />
            <Text style={styles.noTripsText}>Không tìm thấy chuyến đi nào</Text>
          </View>
        )}
      </View>

      {/* Modals */}
      <BusCompanyModal
        visible={busModalVisible}
        onClose={() => setBusModalVisible(false)}
        companies={busCompanies}
        selectedCompanies={selectedCompanies}
        onApply={handleApply}
        onClear={handleClear}
        onSelect={setSelectedCompanies}
      />

      <TimeModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        selectedTime={0}
        onApply={handleApplyTime}
        onClear={handleClearTime}
      />

<SortModal
  visible={sortModalVisible}
  onClose={() => setSortModalVisible(false)}
  selectedOption={sortOption}
  onApply={(option) => {
    setSortOption(option);
    setSortModalVisible(false); // Đóng modal khi nhấn áp dụng
  }}
/>

<FilterModal
  visible={filterModalVisible}
  onClose={() => setFilterModalVisible(false)}
  onApply={(filters) => {
    setFilterOptions(filters);
    setFilterModalVisible(false);
    console.log("🚏 Filter applied:", filters); // Bạn có thể áp dụng lọc vào useMemo nếu muốn
  }}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
  backButton: { marginRight: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e88e5" },
  filterBar: { flexDirection: "row", padding: 16, backgroundColor: "#fff" },
  filterItem: { flexDirection: "row", alignItems: "center", flex: 1 },
  filterIcon: { marginRight: 8 },
  filterText: { fontSize: 16, flex: 1 },
  content: { flex: 1, padding: 16 },
  loadingText: { fontSize: 20, fontWeight: "bold", color: "#777", marginBottom: 20 },
  car: { marginTop: 20, width: 50, height: 50, justifyContent: "center", alignItems: "center" },
  noTripsContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noTripsText: { fontSize: 24, fontWeight: "bold", color: "#777", marginTop: 20 },
});

export default ResultSearch;

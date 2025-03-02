import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useTrip } from "@/context/trip.context";
import { useTripPassenger } from "@/context/trippassenger.context";
import BusCard from "@/components/search/buscard";
import { getTripPassengerByTripId } from "@/utils/api";
import { router } from "expo-router";

const ResultSearch = () => {
  const insets = useSafeAreaInsets();
  const { trips, setTripData } = useTrip(); 
  const { tripPassengers, setTripPassengers } = useTripPassenger(); 

  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimePassed, setLoadingTimePassed] = useState(false); 

  const animationValue = useRef(new Animated.Value(-100)).current;  

  const isFirstRender = useRef(true);

  // Kiểm tra nếu có chuyến đi
  const hasTrips = trips && trips.length > 0;

  // Gọi API và cập nhật dữ liệu vào context
  useEffect(() => {
    const fetchAllTripPassengers = async () => {
      if (hasTrips && isFirstRender.current) {
        const tripIds = trips.map((trip) => trip.id); 
        console.log("Mảng ID các chuyến đi: ", tripIds); 

        const allTripPassengers: any[] = []; 

        for (const tripId of tripIds) {
          try {
            const response = await getTripPassengerByTripId(tripId.toString()); 
            allTripPassengers.push(...response.data); 
          } catch (error) {
            console.error(`Lỗi khi gọi API cho chuyến đi ${tripId}:`, error);
          }
        }

        // Nếu không có hành khách, set trạng thái không có chuyến đi
        if (allTripPassengers.length === 0) {
          setIsLoading(false);
        } else {
          setTripPassengers(allTripPassengers);
          setIsLoading(false);
        }

        isFirstRender.current = false;
      } else {
        setIsLoading(false); // Nếu không có chuyến đi, thay đổi trạng thái isLoading
      }
    };

    fetchAllTripPassengers(); 
  }, [hasTrips, trips, setTripPassengers]);

  // Kiểm tra nếu dữ liệu hành khách có sẵn
  useEffect(() => {
    console.log("Dữ liệu hành khách: ", tripPassengers); 
  }, [tripPassengers]);

  // Hiển thị khi dữ liệu đang được tải
  useEffect(() => {
    // Sau 5 giây, chuyển sang trạng thái đã tải xong
    const timer = setTimeout(() => {
      setLoadingTimePassed(true);
    }, 5000);  // 5 giây

    return () => clearTimeout(timer);  // Dọn dẹp timer khi component unmount
  }, []);

  // Di chuyển xe trong suốt thời gian loading
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 300, // Di chuyển xe đến vị trí cuối
          duration: 3000,  // Thời gian di chuyển 3 giây
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

  if (isLoading && !loadingTimePassed) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fa" }}>
        {/* Loading Screen */}
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>

        {/* Animated Car Effect */}
        <Animated.View style={[styles.car, { transform: [{ translateX: animationValue }] }]}>
          <Ionicons name="car-sport-outline" size={40} color="black" />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách chuyến xe</Text>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {/* Kiểm tra có chuyến đi hay không */}
        {tripPassengers && tripPassengers.length > 0 ? (
          <FlashList
            data={tripPassengers} 
            renderItem={({ item }) => {
              const trip = trips.find((trip) => trip.id === item.tripId);
              return (
                <BusCard
                  departureTime={item.startTime} 
                  arrivalTime={item.endTime} 
                  departureLocation={item.trip?.from?.name}
                  arrivalLocation={item.trip?.to?.name}
                  vehicle={item.passenger?.name} 
                  vehicleType={item.passenger?.description}
                  vehicleImage="https://via.placeholder.com/150" 
                  availableSeats={10} 
                  rating={5.0} 
                  totalReviews={537} 
                  newPrice={item.passenger?.price} 
                  onSelect={() => alert("me")}
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
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e88e5",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 20,
  },
  car: {
    marginTop: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  noTripsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTripsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#777", 
    textAlign: "center", 
    marginTop: 20,
  },
});

export default ResultSearch;

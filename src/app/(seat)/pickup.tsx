import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import hook
import SeatHeader from "@/components/seat/seat.header";
import SeatFooter from "@/components/seat/seat.footer"; // Import SeatFooter
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import { getTripPassengerByTripId } from "@/utils/api";
import { router } from "expo-router";

const PickUp = () => {
  const insets = useSafeAreaInsets(); // Gọi hook để lấy insets

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null); // Để lưu trạng thái của địa điểm được chọn

  const { date } = useLocation();
  const { idTripPassenger, selectedSeatList, totalPrice ,setPickupPoint} = useInfo(); // Get selectedSeatList and totalPrice from useInfo

  const [tripPassengerCurrent, setTripPassengerCurrent] = useState<any[]>([]); // Trip passenger data
  const [seatVehicle, setSeatVehicle] = useState<any[]>([]); // Seat information

  const [pickupLocations, setPickupLocations] = useState<any[]>([]);


  useEffect(() => {
    if (!idTripPassenger) return;
    const fetchTripPassengers = async () => {
      try {
        const res = await getTripPassengerByTripId(idTripPassenger.toString());
        setTripPassengerCurrent(res.data);
        setSeatVehicle(res.data[0].vehicle.seatVehicle);

        // ✅ Lấy timepoints từ phần tử đầu tiên trong mảng
        const timepoints = res.data[0]?.timepoints || [];

      // ✅ Lọc ra các điểm có type là "pickup"
      const pickups = timepoints.filter((tp: any) => tp.type === "pickup");

      // ✅ Set vào state để render
      setPickupLocations(pickups);

      console.log("✅ Pickup locations:", pickups);
      } catch (error) {
        console.error("Lỗi khi gọi API getTripPassengerByTripId:", error);
      }
    };

    fetchTripPassengers();
  }, [idTripPassenger]);

  const busName = tripPassengerCurrent[0]?.passenger?.name || "Xe ABC";
  const departureTime = tripPassengerCurrent[0]?.startTime || "7h:00";
  const departureDate = date || "Thứ 5, 11/04/2025";

  const activeStep = 2; // Active step, you can adjust this based on your flow
  const handleBackPress = () => {
    console.log("Back button pressed");
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId); // Update selected location
  };

  const handleContinue = () => {
    const selectedPickup = pickupLocations.find(
      (loc) => loc.id.toString() === selectedLocation
    );
  
    if (!selectedPickup) {
      console.warn("Vui lòng chọn điểm đón trước khi tiếp tục.");
      return;
    }
  
    // ✅ Lưu object điểm đón vào context
    setPickupPoint({
      time: selectedPickup.time,
      name: selectedPickup.point.name,
      address: selectedPickup.point.address,
    });
  
    console.log("✅ Điểm đón đã lưu vào context:", {
      time: selectedPickup.time,
      name: selectedPickup.point.name,
      address: selectedPickup.point.address,
    });
  
    router.push("/(seat)/dropoff");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <SeatHeader
          busName={busName}
          departureTime={departureTime}
          departureDate={departureDate}
          activeStep={activeStep}
          onBackPress={handleBackPress}
        />
      </View>

      <View style={[styles.content, { flex: 1 }]}>
      <Text style={styles.title}>Chọn điểm đón:</Text>
{pickupLocations.length === 0 ? (
  <Text style={{ textAlign: "center", color: "#888" }}>Không có điểm đón nào khả dụng</Text>
) : (
  pickupLocations.map((location) => (
    <View key={location.id} style={styles.locationItem}>
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={() => handleLocationSelect(location.id.toString())}
      >
        <View style={styles.radio}>
          {selectedLocation === location.id.toString() && (
            <View style={styles.radioSelected} />
          )}
        </View>
        <View style={styles.locationInfo}>
          <Text style={styles.time}>{location.time}</Text>
          <Text style={styles.name}>{location.point.name}</Text>
          <Text style={styles.address}>{location.point.address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ))
)}
      </View>

      {/* Display selected seats and total price dynamically */}
      <SeatFooter
        selectedSeats={selectedSeatList}  
        totalPrice={totalPrice}            
        onContinue={handleContinue}
      />
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
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  locationItem: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1e88e5",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1e88e5",
  },
  locationInfo: {
    flex: 1,
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e88e5",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "#888",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
});

export default PickUp;

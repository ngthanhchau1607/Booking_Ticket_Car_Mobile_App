import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import hook
import SeatHeader from "@/components/seat/seat.header";
import SeatFooter from "@/components/seat/seat.footer"; // Import SeatFooter
import { useLocation } from "@/context/search.context";
import { useInfo } from "@/context/info.context";
import { getTripPassengerByTripId } from "@/utils/api";
import { router } from "expo-router";

const DropOff = () => {
  const insets = useSafeAreaInsets(); // Gọi hook để lấy insets

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null); 

  const { date } = useLocation();
  const { idTripPassenger, selectedSeatList, totalPrice,setDropoffPoint ,setBusCompany , setDepartureTime ,setDepartureDate } = useInfo(); // Get selectedSeatList and totalPrice from useInfo

  const [tripPassengerCurrent, setTripPassengerCurrent] = useState<any[]>([]); // Trip passenger data
  const [seatVehicle, setSeatVehicle] = useState<any[]>([]); // Seat information

  const [dropoffLocations, setDropoffLocations] = useState<any[]>([]); // Sử dụng dropoffLocations thay vì pickupLocations

  useEffect(() => {
    if (!idTripPassenger) return;
    const fetchTripPassengers = async () => {
      try {
        const res = await getTripPassengerByTripId(idTripPassenger.toString());
        setTripPassengerCurrent(res.data);
        setSeatVehicle(res.data[0].vehicle.seatVehicle);

        // ✅ Lấy timepoints từ phần tử đầu tiên trong mảng
        const timepoints = res.data[0]?.timepoints || [];

        // ✅ Lọc ra các điểm có type là "dropoff"
        const dropoffs = timepoints.filter((tp: any) => tp.type === "dropoff");

        // ✅ Set vào state để render
        setDropoffLocations(dropoffs);

        console.log("✅ Dropoff locations:", dropoffs);
      } catch (error) {
        console.error("Lỗi khi gọi API getTripPassengerByTripId:", error);
      }
    };

    fetchTripPassengers();
  }, [idTripPassenger]);

  const busName = tripPassengerCurrent[0]?.passenger?.name || "Xe ABC";
  const departureTime = tripPassengerCurrent[0]?.startTime || "7h:00";
  const departureDate = date || "Thứ 5, 11/04/2025";

  const activeStep = 3; // Active step, you can adjust this based on your flow
  const handleBackPress = () => {
    console.log("Back button pressed");
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId); // Update selected location
  };

  const handleContinue = () => {
    // Cập nhật dropoffPoint trong context
    const selectedLocationData = dropoffLocations.find(
        (location) => location.id.toString() === selectedLocation
      );
      if (selectedLocationData) {
        setDropoffPoint({
          id:selectedLocationData.id,
          time: selectedLocationData.time,
          name: selectedLocationData.point.name,
          address: selectedLocationData.point.address,
        });
      }

      setBusCompany(busName)
      setDepartureTime(departureTime)
      setDepartureDate(departureDate)
    
    router.push("/(seat)/info");
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
        <Text style={styles.title}>Chọn điểm trả:</Text> 
        {dropoffLocations.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#888" }}>
            Không có điểm trả nào khả dụng
          </Text>
        ) : (
          dropoffLocations.map((location) => (
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

export default DropOff;

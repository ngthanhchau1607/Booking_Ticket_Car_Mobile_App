import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const DucPhuBusScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

   //passengerID = 4

  const temporaryDescription = [
    { icon: 'bus', text: 'Nhà xe Đức Phú chuyên cung cấp dịch vụ vận chuyển uy tín.' },
    { icon: 'construct', text: 'Dàn xe được bảo dưỡng kỹ lưỡng, đảm bảo an toàn.' },
    { icon: 'people', text: 'Đội ngũ lái xe và phụ xe tận tâm, chuyên nghiệp.' },
    { icon: 'time', text: 'Tuyến chạy linh hoạt với nhiều khung giờ khác nhau.' },
    { icon: 'location', text: 'Hoạt động trên nhiều tuyến miền Trung và miền Nam.' },
  ];

  const busRoutes = [
    'TP.HCM - Quảng Ngãi',
    'TP.HCM - Bình Định',
    'TP.HCM - Quảng Nam',
    'TP.HCM - Đà Nẵng',
  ];

  const reviews = [
    {
      name: 'Trần Thị M',
      comment: 'Xe chạy êm, không trễ giờ, phục vụ chu đáo.',
      rating: 5,
    },
    {
      name: 'Lê Minh H',
      comment: 'Tôi đã đi nhiều lần, hài lòng với chất lượng dịch vụ.',
      rating: 4,
    },
    {
      name: 'Vũ Quốc C',
      comment: 'Chỗ ngồi thoải mái, tài xế vui tính.',
      rating: 5,
    },
  ];

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhà xe Đức Phú</Text>
      </View>

      <Image
        source={require('@/assets/vehicles/ducphu.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Mô tả */}
      <View style={styles.content}>
        <Text style={styles.title}>Mô tả nhà xe</Text>
        {temporaryDescription.map((item, index) => (
          <View key={index} style={styles.descriptionRow}>
            <Ionicons name={item.icon as any} size={18} color="#1976d2" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Tuyến xe */}
      <View style={styles.content}>
        <Text style={styles.title}>Các tuyến xe thường chạy</Text>
        <View style={styles.routesContainer}>
          {busRoutes.map((route, index) => (
            <Text key={index} style={styles.routeText}>- {route}</Text>
          ))}
        </View>
      </View>

      {/* Đánh giá */}
      <View style={styles.content}>
        <Text style={styles.title}>Đánh giá của khách hàng</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewBox}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#1976d2" />
              <Text style={styles.reviewName}>{review.name}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <View style={styles.ratingRow}>
              {[...Array(review.rating)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#ffc107" />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <Ionicons key={i} name="star-outline" size={16} color="#ccc" />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#1976d2',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    lineHeight: 20,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  routesContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  routeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
  reviewBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
  },
});

export default DucPhuBusScreen;

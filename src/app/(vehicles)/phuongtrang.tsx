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

const PhuongTrangBusScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const temporaryDescription = [
    { icon: 'bus', text: 'Phương Trang – FUTA Bus Lines là thương hiệu vận tải uy tín hàng đầu.' },
    { icon: 'time', text: 'Chạy 24/7, nhiều chuyến trong ngày và xuyên đêm.' },
    { icon: 'construct', text: 'Xe giường nằm chất lượng cao, luôn bảo trì định kỳ.' },
    { icon: 'people', text: 'Đội ngũ tài xế & tiếp viên chuyên nghiệp, thân thiện.' },
    { icon: 'location', text: 'Phủ sóng toàn quốc, đặc biệt mạnh tuyến miền Trung & miền Nam.' },
  ];

  const busRoutes = [
    'TP.HCM - Đà Lạt',
    'TP.HCM - Cần Thơ',
    'TP.HCM - Nha Trang',
    'TP.HCM - Rạch Giá',
    'TP.HCM - Buôn Ma Thuột',
  ];

  const reviews = [
    {
      name: 'Lâm Anh',
      comment: 'Mình thường xuyên đi tuyến Đà Lạt, xe chạy êm và đúng giờ.',
      rating: 5,
    },
    {
      name: 'Trần Quốc T',
      comment: 'Giá hợp lý, dịch vụ chuyên nghiệp, có trạm trung chuyển tiện lợi.',
      rating: 4,
    },
    {
      name: 'Ngọc Duy',
      comment: 'Xe giường nằm sạch sẽ, wifi hơi yếu nhưng tổng thể ổn.',
      rating: 4,
    },
  ];

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhà xe Phương Trang</Text>
      </View>

      <Image
        source={require('@/assets/vehicles/phuongtrang.png')} // Nhớ bỏ ảnh này vào assets
        style={styles.image}
        resizeMode="cover"
      />

      {/* Mô tả có icon */}
      <View style={styles.content}>
        <Text style={styles.title}>Mô tả nhà xe</Text>
        {temporaryDescription.map((item, index) => (
          <View key={index} style={styles.descriptionRow}>
            <Ionicons name={item.icon as any} size={18} color="#d84315" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Tuyến xe */}
      <View style={styles.content}>
        <Text style={styles.title}>Các tuyến xe phổ biến</Text>
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
              <Ionicons name="person-circle-outline" size={24} color="#d84315" />
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
  container: { backgroundColor: '#fff' },
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
    color: '#d84315',
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

export default PhuongTrangBusScreen;

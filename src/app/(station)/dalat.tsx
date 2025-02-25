import React from "react";
import NewsDetail from "@/components/news/news.collection"; // Import NewsDetail component

const DaLat = () => {
    return (
        <NewsDetail
            title="Bến xe Đà Lạt"
            image={require("@/assets/station/dalat.jpg")} // Đảm bảo đường dẫn đúng tới ảnh
            content={`
                📍 **Vị trí**: Bến xe Đà Lạt nằm tại trung tâm thành phố, thuận tiện di chuyển đến các khu du lịch nổi tiếng như Hồ Xuân Hương, Thung Lũng Tình Yêu, và Chùa Linh Sơn.

                ✅ **Dịch vụ tiện ích**:
                - Quầy vé, phòng chờ điều hòa 🛋️
                - Khu vực ăn uống với các món ăn đặc sản Đà Lạt 🍒🍲
                - Dịch vụ gửi xe và bãi đậu xe rộng rãi 🚗

                🚍 **Hệ thống giao thông**: Bến xe Đà Lạt kết nối với nhiều tỉnh thành miền Trung và Tây Nguyên, giúp hành khách dễ dàng di chuyển đến các điểm du lịch nổi tiếng.

                🌿 **Không gian thoáng mát**: Đặc biệt, không gian quanh bến xe rất xanh mát và có nhiều cây cối, tạo cảm giác thư giãn cho hành khách.

                🏪 **Tiện ích xung quanh**: Gần bến xe có các quán cà phê, cửa hàng lưu niệm và dịch vụ hỗ trợ khách du lịch.

                🚶‍♀️ **Di chuyển dễ dàng**: Với vị trí ngay trung tâm thành phố, bến xe dễ dàng tiếp cận bằng các phương tiện giao thông công cộng hoặc taxi.

                🧑‍🏫 **Hỗ trợ khách hàng**: Nếu bạn lần đầu đến Đà Lạt, đừng lo lắng vì các bảng chỉ dẫn rõ ràng và đội ngũ nhân viên luôn nhiệt tình hỗ trợ.
            `}
        />
    );
};

export default DaLat;

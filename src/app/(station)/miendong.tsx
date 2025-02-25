import React from "react";
import NewsDetail from "@/components/news/news.collection"; // Đảm bảo import đúng đường dẫn
import { Ionicons } from "@expo/vector-icons";

const MienDong = () => {
    return (
        <NewsDetail
            title="Bến xe Miền Đông"
            image={require("@/assets/station/miendong.jpg")}
            content={`Bến xe Miền Đông là một trong những bến xe lớn nhất tại TP.HCM, nơi tập trung các chuyến xe khách đi các tỉnh thành ở miền Đông Nam Bộ.
            Bến xe này không chỉ nổi tiếng về quy mô mà còn về sự thuận tiện trong việc kết nối giao thông.

            📍 **Quy mô rộng lớn và tiện nghi**: Bến xe Miền Đông không chỉ lớn mà còn được trang bị đầy đủ tiện nghi, tạo sự thoải mái cho hành khách. 

            ✅ **Dịch vụ đầy đủ**:
            - Quầy vé, phòng chờ tiện nghi
            - Khu vực ăn uống 🍔☕
            - Dịch vụ gửi xe miễn phí 🚗
            
            🚎 **Điểm trung chuyển quan trọng**: Đây là nơi nối liền TP.HCM với các tỉnh thành như Bình Dương, Đồng Nai, Bà Rịa - Vũng Tàu, ...

            🏪 **Cửa hàng và dịch vụ hỗ trợ**: Bến xe có các cửa hàng tiện ích như tiệm thuốc, quán cà phê ☕, khu vực bán đồ ăn nhanh 🍕, v.v...

            🛣️ **Hệ thống giao thông thuận tiện**: Đặc biệt, bến xe nằm trong khu vực giao thông thuận lợi, dễ dàng di chuyển đến các khu vực khác của thành phố.

            🧑‍🏫 **Hỗ trợ cho người mới**: Nếu bạn lần đầu tiên đến bến xe Miền Đông, đừng lo lắng vì nơi đây có hệ thống bảng chỉ dẫn rõ ràng và các nhân viên hỗ trợ nhiệt tình.`}
        />
    );
};

export default MienDong;

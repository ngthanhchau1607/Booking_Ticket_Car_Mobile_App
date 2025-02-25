import React from "react";
import NewsDetail from "@/components/news/news.collection"; // Import NewsDetail component

const MienTay = () => {
    return (
        <NewsDetail
            title="Bến xe Miền Tây"
            image={require("@/assets/station/mientay.jpg")} // Đảm bảo đường dẫn đúng tới ảnh
            content={`
                📍 **Vị trí thuận lợi**: Bến xe nằm ở vị trí dễ dàng tiếp cận từ các khu vực trung tâm thành phố và các tuyến đường chính.

                ✅ **Dịch vụ tiện ích**:
                - Quầy vé, phòng chờ máy lạnh 🛋️
                - Khu vực ăn uống với các quán ăn địa phương 🍜🍗
                - Dịch vụ gửi xe miễn phí 🚗

                🚎 **Hệ thống giao thông phát triển**: Bến xe được kết nối với nhiều tuyến xe khách quan trọng đi các tỉnh miền Tây như Tiền Giang, Vĩnh Long, Cần Thơ, Sóc Trăng...

                🏪 **Tiện ích xung quanh**: Bến xe Miền Tây có các cửa hàng tiện ích như tiệm thuốc, quán cà phê ☕, và khu vực mua sắm cho hành khách.

                🛣️ **Di chuyển dễ dàng**: Bến xe có vị trí gần các trục đường chính, thuận tiện cho việc di chuyển đến các khu vực khác trong thành phố và các tỉnh miền Tây.

                🧑‍🏫 **Dịch vụ hỗ trợ**: Nếu bạn lần đầu đến bến xe Miền Tây, đừng lo lắng vì các bảng chỉ dẫn rõ ràng và nhân viên thân thiện luôn sẵn sàng hỗ trợ bạn.
            `}
        />
    );
};

export default MienTay;

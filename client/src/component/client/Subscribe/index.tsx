import { Input } from "antd";
const { Search } = Input;


const Sub = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="text-2xl font-medium	">Đăng ký nhận tin từ ShopDunk</div>
      <div className="mt-3 mb-5 text-[#515154]">Thông tin sản phẩm mới nhất và chương trình khuyến mãi</div>
      <div className="w-5/12">
        <Search className="w-full" placeholder="Email của bạn" enterButton="Tìm kiếm" size="large" />
      </div>
    </div>
  );
};

export default Sub;

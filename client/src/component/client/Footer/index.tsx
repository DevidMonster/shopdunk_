import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#1d1d1f] pt-10 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <div className="w-7/12">
            <img
              className="w-40"
              src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
              alt="Logo"
            />
            <p className="text-[white] text-lg py-5">
              Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi
              phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
              đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho
              người dùng Việt Nam.
            </p>
            <div>
              <button className="rounded-full border-[3px] p-3 border-[#777] text-3xl">
                <BiLogoFacebook className="text-[#007bff] " />
              </button>
              <button className="rounded-full border-[3px] p-3 border-[#777] text-3xl mx-2">
                <AiFillYoutube className="text-[#dc3545]" />{" "}
              </button>
              <button className="rounded-full border-[3px] p-3 border-[#777] text-3xl">
                <SiZalo className="text-[#007bff]" />{" "}
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between ml-20">
            <div className="text-[white] text-lg">
              <p className="mb-6">Thông tin</p>
              <ul className="flex flex-col text-[#86868b]">
                <li className="text-base mb-3">
                  <Link to={``}>Tin tức</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Giới thiệu</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Check IMEI</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Phương thức thanh toán</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Thuê điểm bán lẻ</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Bảo hành và sửa chữa</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Tuyển dụng</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Đánh giá chất lượng, khiếu lại</Link>
                </li>
              </ul>
            </div>
            <div className="text-[white] text-lg">
              <p className="mb-6">Chính sách</p>
              <ul className="flex flex-col text-[#86868b]">
                <li className="text-base mb-3">
                  <Link to={``}>Thu cũ đổi mới</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Giao hàng</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Giao hàng (Zalo Pay)</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Hủy giao dịch</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Đổi trả</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Bảo hành</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Dịch vụ</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Giải quyết khiếu lại</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Bảo mật thông tin</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Hướng dấn thanh toán VNPAY</Link>
                </li>
              </ul>
            </div>
            <div className="text-[white] text-lg">
              <p className="mb-6">Địa chỉ & Liên hệ</p>
              <ul className="flex flex-col text-[#86868b]">
                <li className="text-base mb-3">
                  <Link to={``}>Tài khoản của tôi</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Đơn đặt hàng</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Hệ thống cửa hàng</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Tìm Store trên Map</Link>
                </li>
                <li className="text-base mb-3">
                  <Link to={``}>Mua hàng</Link>
                </li>
                <li className="text-base mb-3">
                  <Link className="flex" to={``}>
                    Doanh nghiệp :{" "}
                    <div className="ml-1 text-sky-500">0822.688.668</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex justify-between">
          <div>
            <p className="text-[#777]">
              © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH
              & ĐT TP. Hà Nội cấp ngày 08/06/2016.
            </p>
            <p className="text-[#777]">
              Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố
              Hà Nội, Việt Nam
            </p>
            <p className="text-[#777]">
              Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email:
              lienhe@shopdunk.com
            </p>
          </div>
          <div>
            <img className="w-36" src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png" alt="Bộ công thương" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

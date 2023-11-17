import { AiFillYoutube } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router-dom";

type Props = {
  something: boolean;
};

const Footer = (props: Props) => {
  console.log(props);

  return (
    <footer className="bg-[#1d1d1f] pt-10 pb-8">
      <section className=" section-icon-contact fixed bottom-[105px] right-[24px] cursor-pointer z-[4]">
        <div className="icon-contact-item w-[48px] h-[48px] rounded-[50%] border-[1px] text-center border-white shadow-[0_4px_8px_rgba(0,0,0,0.15)] bg-[#0090E4] animate-pulse_icon_contact after:[''] relative after:absolute after:z-[-1] after:w-[48px] after:h-[48px] after:left-0 after:top-0 before:rounded-[50%] before:bg-[#0090E4]  before:animate-euiBeaconPulseSmall2            before:absolute before:z-[-1] before:w-[48px] before:h-[48px] before:left-0 before:top-0 after:rounded-[50%] after:bg-[#0090E4]  after:animate-euiBeaconPulseSmall">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-[30px] text-center m-auto h-[45px] animate-skew_icon_contact transition-all duration-300 ease-in-out"
            viewBox="0 0 1249 439"
          >
            <style></style>
            <path
              className="shp0 fill-white"
              d="m649.69 129.68v-23.37h70.02v328.67h-40.06c-16.49 0-29.87-13.32-29.96-29.78-0.01 0.01-0.02 0.01-0.03 0.02-28.2 20.62-63.06 32.87-100.71 32.87-94.3 0-170.76-76.41-170.76-170.65s76.46-170.64 170.76-170.64c37.65 0 72.51 12.24 100.71 32.86 0.01 0.01 0.02 0.01 0.03 0.02zm-289.64-129.06v10.65c0 19.88-2.66 36.1-15.57 55.14l-1.56 1.78c-2.82 3.2-9.44 10.71-12.59 14.78l-224.76 282.11h254.48v39.94c0 16.55-13.43 29.96-29.98 29.96h-329.73v-18.83c0-23.07 5.73-33.35 12.97-44.07l239.61-296.57h-242.59v-74.89h349.72zm444.58 434.36c-13.77 0-24.97-11.19-24.97-24.94v-409.42h74.94v434.36h-49.97zm271.56-340.24c94.95 0 171.91 76.98 171.91 171.79 0 94.9-76.96 171.88-171.91 171.88-94.96 0-171.91-76.98-171.91-171.88 0-94.81 76.95-171.79 171.91-171.79zm-527.24 273.1c55.49 0 100.46-44.94 100.46-100.4 0-55.37-44.97-100.32-100.46-100.32s-100.47 44.95-100.47 100.32c0 55.46 44.98 100.4 100.47 100.4zm527.24-0.17c55.82 0 101.12-45.27 101.12-101.14 0-55.78-45.3-101.05-101.12-101.05-55.91 0-101.13 45.27-101.13 101.05 0 55.87 45.22 101.14 101.13 101.14z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </section>
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
            <img
              className="w-36"
              src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png"
              alt="Bộ công thương"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

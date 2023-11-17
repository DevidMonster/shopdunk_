import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./index.css"
import { Link } from "react-router-dom";

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

const Banner = ({ dataBanner }: any) => {
  console.log("dataBanner", dataBanner);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        speed={5000}
        loop={true}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {dataBanner?.map((banner: any) => {
          return (
            <SwiperSlide>
              <Link to={banner?.redirectUrl}>
                <img className="w-full" src={banner?.imageUrl} alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./index.css"

import { Navigation, Pagination, Mousewheel, Keyboard , Autoplay} from "swiper/modules";


const Banner = () => {
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
        autoplay={{ delay: 5000 ,disableOnInteraction: false }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination , Mousewheel, Keyboard , Autoplay ]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20kv%2020.10%20T10_Banner%20PC.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20iphone%2015%20TH_PC%20(3).jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20iphone%2015%20pro%20max%20TH_PC%20(3).jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20iphone%2014%20Pro%20Max%20T10_Banner%20PC.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20ipad%20gen%209%20T10_Banner%20PC%20(1).jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20watch%20T10_Banner%20PC.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/banner_thang10/banner%20macbook%20air%20t10_Banner%20PC%20(1).jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/Banner%20th%C3%A1ng%208/banner%20apple%20pay_Banner%20PC.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://shopdunk.com/images/uploaded/banner/Banner%20Web_SD_VN.png" alt="" /></SwiperSlide>
        
      </Swiper>
    </>
  )
}

export default Banner
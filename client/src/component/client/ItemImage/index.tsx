import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./index.css";

import Swiperz from 'swiper';
// import required modules

type IProps = {
  images: any[]
}

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const ItemImage = ({ images = [] }: IProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiperz | null>(null);
  return (
    <>
      <Swiper
        style={{
          //   "--swiper-navigation-color": "#fff",
          //   "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper['destroyed'] ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 border-1 rounded-[5px] overflow-hidden"
      >
        {images.length > 0 && images.map((image: { imageUrl: string }, index: number) => (
          <SwiperSlide key={index}>
            <img src={image.imageUrl} alt="ảnh sản phẩm"/>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        // onSwiper={setThumbsSwiper}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.length > 0 && images.map((image: { imageUrl: string }, index: number) => (
          <SwiperSlide key={index}>
            <img src={image.imageUrl} alt="ảnh sản phẩm"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ItemImage;

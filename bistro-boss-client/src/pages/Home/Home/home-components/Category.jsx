// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import slide1 from "../../../../assets/home/slide1.jpg";
import slide2 from "../../../../assets/home/slide2.jpg";
import slide3 from "../../../../assets/home/slide3.jpg";
import slide4 from "../../../../assets/home/slide4.jpg";
import slide5 from "../../../../assets/home/slide5.jpg";
import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";

const Category = () => {
  return (
    <section className="w-9/12 mx-auto">
      <SectionTitle
        heading={"ORDER ONLINE"}
        subHeading={"From 11AM to 10PM"}
      ></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-12"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <p className="text-2xl font-bold -mt-12 px-6">SALADS</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <p className="text-2xl font-bold -mt-12 px-6">PIZZA</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <p className="text-2xl font-bold -mt-12 px-6">SOUPS</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <p className="text-2xl font-bold -mt-12 px-6">DESSERTS</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <p className="text-2xl font-bold -mt-12 px-6">SALADS</p>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;

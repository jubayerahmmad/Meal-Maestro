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
import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";

const Category = () => {
  return (
    <section className="lg:w-9/12 mx-auto">
      <SectionTitle
        heading={"ORDER ONLINE"}
        subHeading={"From 11AM to 10PM"}
      ></SectionTitle>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-12"
        >
          <SwiperSlide>
            <img className="object-cover" src={slide1} alt="slider" />
            <p className="lg:text-2xl font-bold -mt-12 lg:px-6">SALADS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-cover" src={slide2} alt="slider" />
            <p className="lg:text-2xl font-bold -mt-12 lg:px-6">PIZZA</p>
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-cover" src={slide3} alt="slider" />
            <p className="lg:text-2xl font-bold -mt-12 lg:px-6">SOUPS</p>
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-cover" src={slide4} alt="slider" />
            <p className="lg:text-2xl font-bold -mt-12 lg:px-6">DESSERTS</p>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;

import { Swiper, SwiperSlide } from "swiper/react";
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
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className="mySwiper mx-auto my-6"
        >
          <SwiperSlide>
            <img
              className="object-cover  w-full h-96"
              src={slide1}
              alt="slider"
            />
            <p className="lg:text-2xl font-bold -mt-12 px-6 text-white">
              SALADS
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover  w-full h-96"
              src={slide2}
              alt="slider"
            />
            <p className="lg:text-2xl font-bold -mt-12 px-6 text-white">
              PIZZA
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover  w-full h-96"
              src={slide3}
              alt="slider"
            />
            <p className="lg:text-2xl font-bold -mt-12 px-6 text-white">
              SOUPS
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover  w-full h-96"
              src={slide4}
              alt="slider"
            />
            <p className="lg:text-2xl font-bold -mt-12 px-6 text-white">
              DESSERTS
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;

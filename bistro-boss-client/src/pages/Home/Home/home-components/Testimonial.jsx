import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteRight } from "react-icons/fa6";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <section>
      <SectionTitle
        subHeading={"What our Clients Say"}
        heading={"Testimonials"}
      ></SectionTitle>
      <div className="my-10 bg-slate-100 p-6">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex justify-center">
                <Rating
                  style={{ maxWidth: 250 }}
                  value={review.rating}
                  readOnly
                />
              </div>

              <div className="mx-auto flex flex-col items-center p-16 text-center">
                <FaQuoteRight size={96} />

                <p>{review.details}</p>
                <h1 className="text-3xl font-bold text-orange-500">
                  {review.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;

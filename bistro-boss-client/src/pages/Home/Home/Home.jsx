import Banner from "./home-components/Banner";
import Category from "./home-components/Category";
import Featured from "./home-components/Featured";
import PopularMenu from "./home-components/PopularMenu";
import Testimonial from "./home-components/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="mx-auto w-10/12">
        <Category></Category>
        <PopularMenu></PopularMenu>
      </div>
      <Featured></Featured>
      <div className="mx-auto w-10/12">
        <Testimonial></Testimonial>
      </div>
    </div>
  );
};

export default Home;

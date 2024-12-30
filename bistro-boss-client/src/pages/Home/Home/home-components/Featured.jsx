import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg";

const Featured = () => {
  return (
    <section className="featured-item text-center lg:text-start text-white bg-fixed h-[450px] lg:h-[600px] flex flex-col items-center justify-center py-6 my-12">
      <SectionTitle
        subHeading={"Check it Out"}
        heading={"Featured items"}
      ></SectionTitle>

      <div className="lg:flex items-center gap-6 w-10/12 mx-auto my-6 lg:px-24">
        <div className="mx-auto flex justify-center mb-4">
          <img className="lg:w-96 w-48 lg:h-64 h-32" src={featuredImg} alt="" />
        </div>
        <div className="space-y-4">
          <p>20 Oct, 2026</p>
          <h1 className="lg:text-3xl text-xl uppercase">
            Discover Your New Favorite
          </h1>
          <p className="text-xs lg:text-lg">
            Explore our featured items and indulge in a culinary journey that
            will leave you wanting more.
          </p>
          <button className="px-3 py-2 border-b-2 font-bold border-b-white rounded-md">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;

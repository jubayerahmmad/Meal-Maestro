import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg";
import "../../../../index.css";

const Featured = () => {
  return (
    <section className="featured-item bg-fixed h-[600px] flex flex-col items-center justify-center my-12">
      <SectionTitle
        subHeading={"Check it Out"}
        heading={"Featured items"}
      ></SectionTitle>

      <div className="flex items-center gap-6 w-10/12 mx-auto my-6 px-24">
        <div>
          <img className="w-96 h-64" src={featuredImg} alt="" />
        </div>
        <div className="space-y-4">
          <p>20 Oct, 2026</p>
          <h1 className="text-3xl uppercase">Discover Your New Favorite</h1>
          <p>
            Explore our featured items and indulge in a culinary journey that
            will leave you wanting more.
          </p>
          <button className="btn">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;

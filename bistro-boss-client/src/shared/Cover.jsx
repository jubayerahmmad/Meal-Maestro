import { Parallax } from "react-parallax";

const Cover = ({ bg, title, description }) => {
  return (
    <Parallax
      blur={{ min: -55, max: 55 }}
      bgImage={bg}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div className="hero lg:h-[700px] h-[300px]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold uppercase">
              {title}
            </h1>
            <p className="mb-5 text-xs lg:text-base uppercase">{description}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;

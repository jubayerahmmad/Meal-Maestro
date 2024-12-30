import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col justify-center text-center">
      <p className="text-orange-500 italic">---{subHeading}---</p>
      <h3 className="font-bold border-y-2 lg:text-4xl text-2xl w-fit mx-auto p-2 my-2 uppercase">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;

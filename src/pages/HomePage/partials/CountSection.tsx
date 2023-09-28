import React from "react";

type CountSectionProps = {
  title?: string;
  content?: number;
  icon?: React.ReactNode;
};

const CountSection: React.FC<CountSectionProps> = ({ title, content, icon }) => {
  return (
    <div className="w-full h-[200px] bg-white p-8 rounded-md shadow-lg relative">
      <h2 className="text-[18px] font-bold capitalize text-teal-600">{title} :</h2>
      <div className="mt-4 flex items-center justify-center">
        <p className="text-[26px] font-bold">{content}</p>
      </div>
      <div className="absolute bottom-4 left-4">
        {icon}
      </div>
    </div>
  );
};

export default CountSection;

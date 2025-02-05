import React from "react";

const MessageDetails: React.FC<any> = ({ data }) => {
  const { heading, name, desc, timeline } = data[0];

  return (
    <>
      {heading && (
        <h1 className="text-sm items-center  inline-flex text-gray-600 relative">
          {heading} <span className="ml-2 text-xl"> {name}</span>
          <span className="absolute top-[13px] left-0 w-full h-[2px] bg-gray-600 "></span>
        </h1>
      )}
      <p className="text-sm text-gray-500">{desc}</p>
      <div className="flex mt-2 gap-x-4">
        {timeline.map((item: any) => (
          <p className="text-sm" key={item.id}>
            <span className="text-gray-500 font-medium mr-1">{item.name}:</span>
            {item.data}
          </p>
        ))}
      </div>
    </>
  );
};

export default MessageDetails;

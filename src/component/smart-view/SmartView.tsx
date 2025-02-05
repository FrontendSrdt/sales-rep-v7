import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tabData, { NextArrow, PrevArrow } from "../../data/tabData-for-smartView";
import store from "../../store";
import { resetToggleCardHandler } from "../../store/ui/ui-slice";

function SmartView() {
  // State to track the active tab (slide)
  const [activeTab, setActiveTab] = useState<number>(0);

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Set custom prev arrow
    nextArrow: <NextArrow />, // Set custom next arrow
    beforeChange: (current: number, next: number) => {
      if (next > current) {
        setActiveTab((prevTab) => prevTab + 1); // Increment active tab
      } else {
        setActiveTab((prevTab) => prevTab - 1); // Decrement active tab
      }
    },
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 5 } },
      { breakpoint: 1370, settings: { slidesToShow: 4 } },
      { breakpoint: 1050, settings: { slidesToShow: 3 } },
      { breakpoint: 850, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  const tabhandler = (index: number) => {
    setActiveTab(index);
    store.dispatch(resetToggleCardHandler());
  };
  return (
    <div>
      <div className="my-4 mx-3 md:mx-5 px-3 md:px-6 py-3 md:py-6 shadow-md rounded-md bg-white">
        {/* Slider */}
        <Slider {...settings}>
          {tabData.map((tab, index) => (
            <div key={index} className="px-[2px] cursor-pointer" onClick={tabhandler.bind({}, index)}>
              <div className={`flex justify-between py-2 px-4 ${activeTab === index ? "bg-white text-gray-700 border-t-2 border-blue-600" : "bg-gray-100 text-gray-600 rounded"}`}>
                <div className="flex items-center gap-x-2">
                  <div className="text-blue-600 text-sm">{tab.icon}</div>
                  <div className="text-sm">{`${tab.content}`}</div>
                </div>
                <div>
                  <div className="text-sm">{`${tab.count}`}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* Display Content According to Active Tab */}
        <div>{tabData[activeTab].data}</div>
      </div>
    </div>
  );
}

export default SmartView;

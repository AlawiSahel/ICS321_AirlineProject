import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiSwordInStone } from "react-icons/gi";
// import React from "react";
import Slider from "react-slick";
import GenreCard from "./../genre/GenreCard.jsx";
import { IoIosColorWand } from "react-icons/io";
import { FaChildReaching } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { TbBusinessplan } from "react-icons/tb";
import { MdOutlineComputer } from "react-icons/md";
import { GiMeat } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { MdSportsVolleyball } from "react-icons/md";
import { GiGardeningShears } from "react-icons/gi";
import { popularBookGenres } from "./../../constants/genres";

function GroupSlider() {
  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    infinite: false,

    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          // infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          // infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 1,
          infinite: false,
          // centerPadding: "60px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          // infinite: true,
          centerPadding: "2px",
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,

          // infinite: true,
          centerPadding: "2px",
        },
      },
      {
        breakpoint: 365,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          // infinite: true,
          centerPadding: "2px",
        },
      },

      // 912
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {popularBookGenres.map((genre) => (
          <GenreCard
            key={genre.value}
            value={genre.value}
            name={genre.label}
          ></GenreCard>
        ))}
      </Slider>
    </div>
  );
}

export default GroupSlider;

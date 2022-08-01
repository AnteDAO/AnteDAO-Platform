import React from "react";
import withWidth from "@material-ui/core/withWidth";
import useStyles from "./style";
import LandingCard from "../Card";
import Slider from "react-slick";

interface CardsInfo {
  type?: number;
  banner?: number;
  token_image?: number;
  title: number;
  description?: number;
}

const SliderComponent: React.FC<any> = (props: any) => {
  const styles = useStyles();
  const cardsInfo: Array<CardsInfo> = props.cardsInfo;
  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          className: "center",
          centerMode: true,
          // variableWidth: true
          // centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: "center",
          centerMode: true,
          // centerPadding: "30px",
          // variableWidth: true
        },
      },
    ],
  };

  return (
    <div className={`${styles.listPools}`}>
      {props.title && (
        <div className="list-pool-header">
          <h2>{props.title}</h2>
        </div>
      )}

      <div className="pools">
        <Slider {...settings}>
          {cardsInfo.map((cardInfo, index) => {
            return <LandingCard key={index} cardInfo={cardInfo} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default withWidth()(SliderComponent);

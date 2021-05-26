import React, { useState } from "react";
import "../App.css";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import SearchBar from "../components/SearchBar";
import MiningCard from "../components/MiningCard";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className="slick-arrow-custom-right"
      style={{ ...style }}
      onClick={onClick}
    >
      &#62;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow-custom-left"
      style={{ ...style }}
      onClick={onClick}
    >
      &#60;
    </div>
  );
}

function Mining(props) {
  const [searchText, setSearchText] = useState("");

  const matches = useMediaQuery("(min-width:900px)");

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 2000,
    // autoplay: true,
    // slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const searchCriteria = (pools) => {
    var arr = pools;

    if (searchText != "") {
      console.log(arr);
      console.log(arr.filter((e) => e.name.includes(searchText)));
      arr = arr.filter((e) =>
        e.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return arr;
  };

  return (
    <div
      className="Mining"
      style={{ paddingBottom: matches ? "20rem" : "37rem" }}
    >
      <img src="./new-images/mining-bg.png" />
      <Grid
        container
        spacing={4}
        alignItems="center"
        style={{ maxWidth: "1280px", margin: "auto" }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          md={6}
          style={{ textAlign: matches ? "left" : "center" }}
        >
          <h3 style={{ color: "white", fontWeight: "500", fontSize: "16px" }}>
            Total SWAPS Mined
            <span style={{ fontWeight: "700", color: "#3369FF" }}>
              <span style={{ color: "white" }}> : </span>
              {500}
            </span>
          </h3>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={6}
          style={{ textAlign: matches ? "right" : "right" }}
        >
          <SearchBar handleChange={handleChange} />
        </Grid>{" "}
      </Grid>
      <div style={{ marginBottom: "4rem" }}>
        <Slider
          style={{ maxWidth: "1280px", margin: "auto", marginTop: "4rem" }}
          {...settings}
          centerPadding={"200px"}
          slidesToShow={
            searchCriteria(props.assetList).length > 2 && matches ? 2 : 1
          }
        >
          {props.assetList &&
            searchCriteria(props.assetList).map((e) => {
              return <MiningCard data={e} />;
            })}
        </Slider>
      </div>
    </div>
  );
}

export default Mining;

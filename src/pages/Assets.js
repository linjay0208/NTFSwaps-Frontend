import React, { useState } from "react";
import "../App.css";
import AssetCard from "../components/AssetCard.js";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import CreateButton from "../components/CreateButton.js";
import CreateModal from "../components/CreateModal.js";
import SearchBar from "../components/SearchBar";
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

function Assets(props) {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(min-width:900px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
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

  if (matches)
    return (
      <div className="Assets">
        <CreateModal
          open={open}
          handleClose={handleClose}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          openSnack={props.openSnack}
        />
        <br />
        <br />
        <br />
        <br />
        <Grid
          container
          spacing={4}
          style={{ maxWidth: "1280px", margin: "auto" }}
        >
          <Grid item xs={12} md={6} style={{ textAlign: "left" }}>
            <CreateButton onClick={handleOpen}>Create Asset Pool</CreateButton>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
            <SearchBar handleChange={handleChange} />
          </Grid>
        </Grid>
        <br />
        <br />
        <Slider
          style={{ maxWidth: "1280px", margin: "auto" }}
          {...settings}
          centerPadding={"200px"}
          slidesToShow={searchCriteria(props.assetList).length > 2 ? 3 : 1}
        >
          {props.assetList &&
            searchCriteria(props.assetList).map((e) => {
              return <AssetCard data={e} />;
            })}
        </Slider>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  else {
    return (
      <div className="Assets" style={{ paddingBottom: "37rem" }}>
        <CreateModal
          open={open}
          handleClose={handleClose}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          openSnack={props.openSnack}
        />
        <br />
        <br />
        <br />
        <br />
        <Grid
          container
          spacing={4}
          style={{ maxWidth: "1280px", margin: "auto" }}
        >
          <Grid item xs={12} sm={5} style={{ textAlign: "center" }}>
            <CreateButton
              onClick={handleOpen}
              style={{ margin: "0px", marginLeft: "-25px" }}
            >
              Create Asset Pool
            </CreateButton>
          </Grid>
          <Grid item xs={12} sm={5} style={{ textAlign: "right" }}>
            <SearchBar handleChange={handleChange} />
          </Grid>
        </Grid>
        <br />
        <br />
        <Slider
          style={{ maxWidth: "900px", margin: "auto" }}
          {...settings}
          centerPadding={"200px"}
          slidesToShow={1}
        >
          {props.assetList &&
            searchCriteria(props.assetList).map((e) => {
              return (
                <div>
                  <AssetCard data={e} />
                </div>
              );
            })}
        </Slider>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Assets;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ClearButton from "../components/ClearButton";
import AquaButton from "../components/AquaButton";
import WhiteButton from "../components/WhiteButton";
import FilledButton from "../components/FilledButton";
import CapsuleButton from "../components/CapsuleButton";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    background: "",
    borderRadius: "14px",
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "18px",
    width: "100%",
    fontWeight: "bold",
  },
  paper: {
    padding: "10px 20px",
    background: "#262626",
    border: 0,
    borderRadius: "50px",
    color: "white",
  },
  input: {
    color: "white",
    borderRadius: "15px",
    border: "1.5px solid orange",
    "&& .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #FF7F00",
    },
  },
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow-custom-right"
      style={{ ...style }}
      onClick={onClick}
      style={{ right: "-50px" }}
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
      style={{ left: "-50px" }}
    >
      &#60;
    </div>
  );
}

function Home() {
  const classes = useStyles();
  const [faqToggle, setFaqToggle] = useState(0);
  const [sliderToggle, setSliderToggle] = useState(false);
  const [exchange, setExchange] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const exactMatches = useMediaQuery("(min-width:769px)");

  const openFaq = (e) => {
    if (faqToggle == e) {
      setFaqToggle(0);
    } else {
      setFaqToggle(e);
    }
  };

  const hiwList1 = [
    "./Hiw1-01.svg",
    "./Hiw1-02.svg",
    "./Hiw1-03.svg",
    "./Hiw1-04.svg",
    "./Hiw1-05.svg",
  ];
  const hiwList2 = [
    "./Hiw2-01.svg",
    "./Hiw2-02.svg",
    "./Hiw2-03.svg",
    "./Hiw2-04.svg",
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className="Home"
      id="home"
      style={{
        backgroundImage: 'url("./Main_Bg.png")',
        backgroundPosition: "center center",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Grid
        container
        spacing={4}
        style={{ maxWidth: "1280px", margin: "auto", width: "100%" }}
      >
        {!exactMatches && (
          <Grid item xs={12} md={6}>
            <br />
            <br />
            <img src="./new-roll-up2.gif" style={{ width: "100%" }} />
          </Grid>
        )}
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ padding: "0 3rem" }}
        >
          <Grid item xs={12} md={6}>
            <div className="MainBox" style={{ marginTop: matches && "3.5rem" }}>
              <h1>Swap NFTs for Better Prices!</h1>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "1rem" }}
                justify={exactMatches ? "flex-start" : "center"}
              >
                <Grid item>
                  <Link to="/assets">
                    <ClearButton style={{ minWidth: "200px" }}>
                      ASSETS
                    </ClearButton>
                  </Link>
                </Grid>
                <Grid item>
                  <div
                    onMouseOver={() => setExchange(true)}
                    onMouseOut={() => setExchange(false)}
                  >
                    <FilledButton
                      style={{
                        minWidth: "200px",
                      }}
                    >
                      BUY $SWAPS
                    </FilledButton>
                    <div
                      style={{
                        opacity: !exchange && "0",
                        height: !exchange && "0",
                        transition: "0.3s ease-in-out",
                      }}
                    >
                      <a href="https://latoken.com/exchange/SWAPS_USDT">
                        <WhiteButton
                          style={{ marginTop: "1.5rem", minWidth: "200px" }}
                        >
                          Latoken
                        </WhiteButton>
                      </a>
                      <br />
                      <a href="https://v1exchange.pancakeswap.finance/#/swap">
                        <AquaButton
                          style={{ marginTop: "1rem", minWidth: "200px" }}
                        >
                          PANCAKESWAP
                        </AquaButton>
                      </a>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {exactMatches && (
            <Grid item xs={0} md={6}>
              <img src="./new-roll-up2.gif" style={{ width: "100%" }} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <h3
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            The history of NFTs has shown that a very small percentage of NFTs
            stay relevant over time, with most NFTs losing their value after a
            few months. NFTs quickly become illiquid and therefore holder can't
            sell.
          </h3>
          <h3
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            Using NFTSwaps, any one can deposit their NFT to the NFTSwaps
            required pool and obtain BEP20 token derivatives that can be
            exchanged directly on PancakeSwap and BakerySwap from the NFTSwaps
            UI.
          </h3>
        </Grid>

        <Grid item xs={12} md={12} id="features" style={{ paddingTop: "4rem" }}>
          <div className="OrangeBox">
            <h1 name="features">Features</h1>
          </div>
        </Grid>
        <div style={{ padding: "0 16px" }}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={4} justify="center" md={3}>
              <div
                style={{
                  border: "1px solid #FF7F00",
                  padding: "20px 20px 5px 20px",
                  borderRadius: "30px",
                  color: "white",
                  height: "300px",
                }}
              >
                <img
                  style={{ width: "90px", height: "90px", padding: "10px" }}
                  src="./sort.svg"
                />
                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "28px",
                    margin: 0,
                  }}
                >
                  Tokenise
                </h3>
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "22px",
                    margin: 0,
                  }}
                >
                  Convert your NFTs to BEP20 equivalents.
                </h3>
              </div>
            </Grid>

            <Grid item xs={12} sm={4} justify="center" md={3}>
              <div
                style={{
                  border: "1px solid #FF7F00",
                  padding: "20px 20px 5px 20px",
                  borderRadius: "30px",
                  color: "white",
                  height: "300px",
                }}
              >
                <img
                  style={{ width: "90px", height: "90px", padding: "10px" }}
                  src="./Solid.svg"
                />
                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "28px",
                    margin: 0,
                  }}
                >
                  Better Prices
                </h3>
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "22px",
                    margin: 0,
                  }}
                >
                  Get better prices for your NFTs.
                </h3>
              </div>
            </Grid>

            <Grid item xs={12} sm={4} justify="center" md={3}>
              <div
                style={{
                  border: "1px solid #FF7F00",
                  padding: "20px 20px 5px 20px",
                  borderRadius: "30px",
                  color: "white",
                  height: "300px",
                }}
              >
                <img
                  style={{ width: "90px", height: "90px", padding: "10px" }}
                  src="./money.svg"
                />
                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "28px",
                    margin: 0,
                  }}
                >
                  More Liquidity
                </h3>
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "22px",
                    margin: 0,
                  }}
                >
                  Creators can access deeper liquidity.
                </h3>
              </div>
            </Grid>

            <Grid item xs={12} sm={4} justify="center" md={3}>
              <div
                style={{
                  border: "1px solid #FF7F00",
                  padding: "20px 20px 5px 20px",
                  borderRadius: "30px",
                  color: "white",
                  height: "300px",
                }}
              >
                <img
                  style={{ width: "90px", height: "90px", padding: "10px" }}
                  src="./lighting.svg"
                />
                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "28px",
                    margin: 0,
                  }}
                >
                  Fast Swaps
                </h3>
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "22px",
                    margin: 0,
                  }}
                >
                  Faster NFT swaps with no Time Delay.
                </h3>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid
          item
          xs={12}
          md={12}
          id="how-it-works"
          style={{ paddingTop: "4rem" }}
        >
          <div className="OrangeBox">
            <h1>How It Works</h1>
          </div>

          <br />
          <br />
          <CapsuleButton
            onClick={() => setSliderToggle(false)}
            position="left"
            active={sliderToggle}
          >
            Case One
          </CapsuleButton>
          <CapsuleButton
            onClick={() => setSliderToggle(true)}
            position="right"
            active={!sliderToggle}
          >
            Case Two
          </CapsuleButton>
          <br />
          <br />

          {!sliderToggle && (
            <div style={{ width: "70%", margin: "auto" }}>
              <Slider {...settings} centerPadding={"200px"}>
                {hiwList1.map((e) => {
                  return <img style={{ width: "80%" }} src={e} />;
                })}
              </Slider>
            </div>
          )}

          {sliderToggle && (
            <div style={{ width: "70%", margin: "auto" }}>
              <Slider {...settings} centerPadding={"200px"}>
                {hiwList2.map((e) => {
                  return <img style={{ width: "80%" }} src={e} />;
                })}
              </Slider>
            </div>
          )}
        </Grid>

        <Grid item xs={12} md={12}>
          <div className="OrangeBox">
            <h1>Road Map</h1>
          </div>
          <br />
          <br />
          <img src="./road.png" style={{ width: "100%" }} />
          <br />
          <br />
        </Grid>

        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <h2>Contact Us</h2>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  color="primary"
                  variant="outlined"
                  InputProps={{ className: classes.input }}
                  placeholder="Project Name"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  color="primary"
                  variant="outlined"
                  InputProps={{ className: classes.input }}
                  placeholder="Project Telegram"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  color="primary"
                  variant="outlined"
                  InputProps={{ className: classes.input }}
                  placeholder="Your Telegram Username"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  color="primary"
                  variant="outlined"
                  InputProps={{ className: classes.input }}
                  placeholder="Project Link"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  color="primary"
                  variant="outlined"
                  InputProps={{ className: classes.input }}
                  placeholder="Message"
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <FilledButton style={{ fontWeight: "700", fontSize: "24px" }}>
              Submit Request
            </FilledButton>
            <br />
            <br />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <div className="OrangeBox">
            <h1>FAQ</h1>
          </div>
        </Grid>

        <Grid item xs={12} sm={10} md={8} style={{ margin: "auto" }}>
          <div className="FAQBox" onClick={() => openFaq(1)}>
            <div>What is NFTSwaps?</div>
            <span>{faqToggle == 1 ? "-" : "+"}</span>
          </div>
          {faqToggle == 1 && (
            <div className="AnswerBox">
              NFTSwaps is a Non-Fungible to Fungible Swap platform. NFTSwaps
              Platform V1.01, allows users to tokenize their NFT Assets (NFTs -
              Bep20 tokens) as long as these NFT Assets are listed on NFTSwaps.
              These tokens (Bep20) are tradeable on PancakeSwap using the
              NFTSwaps UI.
            </div>
          )}
          <div className="FAQBox" onClick={() => openFaq(2)}>
            <div>
              Do I need to leave NFTSwaps UI to trade BEP20 NFT Derivatives on
              PancakeSwap or BakerySwap?
            </div>
            <span>{faqToggle == 2 ? "-" : "+"}</span>
          </div>
          {faqToggle == 2 && (
            <div className="AnswerBox">
              Users don't need to leave the NFTSwaps UI to trade their NFT BEP20
              Derivatives on PancakeSwap and BakerySwap, but there is a 1% fees
              on all trades and it includes the AMM Normal fees.{" "}
            </div>
          )}
          <div className="FAQBox" onClick={() => openFaq(3)}>
            <div>What are NFT BEP20 Derivatives?</div>

            <span>{faqToggle == 3 ? "-" : "+"}</span>
          </div>
          {faqToggle == 3 && (
            <div className="AnswerBox">
              NFT BEP20 Derivatives are the BEP20 Token representation of any
              NFT listed in the NFTSwaps Assets pool. They usually posses a
              token ticker of this format - (NFTname(SuffixX)).{" "}
            </div>
          )}
          <div className="FAQBox" onClick={() => openFaq(4)}>
            <div>Who is the NFTSwap Team?</div>

            <span>{faqToggle == 4 ? "-" : "+"}</span>
          </div>
          {faqToggle == 4 && (
            <div className="AnswerBox">
              NFTSwaps is a product of Blockchain4Africa. The company is created
              to provide e-commerce services, Internet Marketing, ICT, and
              blockchain-based services. 
            </div>
          )}
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <div
        style={{
          height: matches ? "20rem " : "37rem ",
        }}
      ></div>
    </div>
  );
}

export default Home;

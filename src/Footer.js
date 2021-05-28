import "./App.css";
import Grid from "@material-ui/core/Grid";
import { Twitter, Telegram, GitHub, YouTube } from "@material-ui/icons";
import SvgIcon from "@material-ui/core/SvgIcon";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Footer() {
  const matches = useMediaQuery("(min-width:768px)");
  return (
    <div className="Footer">
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <p style={{ fontSize: "1rem" }} className="footerLinks">
            NFTSwaps is a product of Blockchain4Africa. The company is created
            to provide e-commerce services, Internet Marketing, ICT, and
            blockchain-based services. 
          </p>
        </Grid>
        <Grid
          item
          xs={6}
          md={4}
          style={{ textAlign: "left", fontFamily: "Poppins" }}
        >
          <h3 className="footerTitles">Socials</h3>
          <Grid container spacing={1}>
            <Grid item>
              <a target="_blank" href="https://nftswaps.medium.com/">
                <svg
                  height="100%"
                  version="1.1"
                  viewBox="0 0 24 24"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="footerIcon"
                  style={{
                    color: "#FF7F00",
                    backgroundImage: "none",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "1.41421",
                  }}
                >
                  <rect
                    height="24"
                    id="Artboard12"
                    style={{ fill: "none" }}
                    width="24"
                    x="0"
                    y="0"
                  />
                  <g>
                    <path
                      d="M18.602,6.448l-3.698,0l-2.631,6.621l-2.99,-6.621l-3.951,0l0,0.329l1.392,1.701l-0.019,6.57l-1.376,1.878l0.003,0.311l3.886,0l0.01,-0.286l-1.628,-1.903l0.043,-5.317l3.433,7.506l0.414,0l3.049,-7.684l0,6.25l-1.25,1.182l0,0.252l5.313,0l0,-0.302l-1.218,-1.155l-0.017,-7.946l1.235,-1.055l0,-0.331Z"
                      style={{ fill: "#FF7F00" }}
                    />
                  </g>
                </svg>
              </a>
            </Grid>
            <Grid item>
              <a target="_blank" href="https://twitter.com/nftswaps_io">
                <Twitter
                  className="footerIcon"
                  fontSize="small"
                  classes={{ fontSizeSmall: "footerIconSmallerSize" }}
                  style={{
                    color: "#FF7F00",
                    backgroundImage: "none",
                  }}
                />
              </a>
            </Grid>
            <Grid item>
              <a target="_blank" href="https://t.me/nftswaps_io">
                <Telegram
                  fontSize="small"
                  classes={{ fontSizeSmall: "footerIconSmallerSize" }}
                  className="footerIcon"
                  style={{
                    color: "#FF7F00",
                    backgroundImage: "none",
                  }}
                />
              </a>
            </Grid>
            <Grid item>
              <a target="_blank" href="https://github.com/NFTSwapsio">
                <GitHub
                  fontSize="small"
                  classes={{ fontSizeSmall: "footerIconSmallerSize" }}
                  className="footerIcon"
                  style={{
                    color: "#FF7F00",
                    backgroundImage: "none",
                  }}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                target="_blank"
                href="https://www.youtube.com/c/NFTSwapsOfficial"
              >
                <YouTube
                  fontSize="small"
                  classes={{ fontSizeSmall: "footerIconSmallerSize" }}
                  className="footerIcon"
                  style={{
                    color: "#FF7F00",
                    backgroundImage: "none",
                  }}
                />
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3 className="footerTitles">Quick Links</h3>

          <Link to="/#home">
            <p
              style={{ cursor: "pointer", fontSize: matches ? "1rem" : "12px" }}
              className="footerLinks"
            >
              HOME
            </p>
          </Link>
          <Link to="/#features">
            <p
              style={{ cursor: "pointer", fontSize: matches ? "1rem" : "12px" }}
              className="footerLinks"
            >
              FEATURES
            </p>
          </Link>
          <Link to="/#how-it-works">
            <p
              style={{ cursor: "pointer", fontSize: matches ? "1rem" : "12px" }}
              className="footerLinks"
            >
              HOW IT WORKS
            </p>
          </Link>
          <p
            style={{ cursor: "pointer", fontSize: matches ? "1rem" : "12px" }}
            className="footerLinks"
          >
            TERMS AND CONDITIONS
          </p>
        </Grid>
      </Grid>
      <br />
      <br />
      <p style={{ fontFamily: "Mulish", fontWeight: 400, fontSize: "10px" }}>
        © 2021 NFTSwaps All Right Reserved
      </p>
      <br />
    </div>
  );
}

export default Footer;

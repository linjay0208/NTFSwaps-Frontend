import "../App.css";
import FilledButton from "./FilledButton.js";
import { useHistory } from "react-router-dom";
import { Grid, Divider } from "@material-ui/core";

function AssetCard(props) {
  const history = useHistory();
  const openPage = () => {
    history.push("/pool/" + props.data.symbol);
  };

  return (
    <div className="AssetCard">
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <div
            style={{
              width: "67px",
              height: "67px",
              backgroundImage: `url("./new-images/${props.data.name}.svg")`,
              backgroundSize: "cover",
            }}
          ></div>
        </Grid>
        <Divider
          style={{ width: "20px", height: "2px", backgroundColor: "black" }}
        />
        <Grid item>
          <div
            className="IconX"
            style={{ width: "60px", height: "60px", lineHeight: "60px" }}
          >
            {props.data.symbol}
          </div>
        </Grid>
      </Grid>
      <p style={{ fontSize: "20px", fontWeight: "700", height: "35px" }}>
        {props.data.name} - {props.data.symbol}
      </p>
      <p style={{ fontSize: "14px", fontWeight: "500" }}>
        Swap {props.data.name} To {props.data.symbol}
      </p>
      <FilledButton
        onClick={openPage}
        style={{
          padding: "2px 30px",
          borderRadius: "30px",
          fontSize: "16px",
          fontWeight: "700",
          margin: "1rem 0 3rem",
        }}
      >
        SWAP
      </FilledButton>
      <div style={{ padding: "0px 16px" }}>
        <Grid container justify="space-between" alignItems="center" spacing={1}>
          <Grid
            item
            xs={7}
            style={{ textAlign: "left", fontSize: "13px", fontWeight: "500" }}
          >
            Liquidity
          </Grid>
          <Grid
            item
            xs={5}
            style={{ textAlign: "right", fontSize: "15px", fontWeight: "700" }}
          >
            {props.data.liquidity}
          </Grid>
          <Grid
            item
            xs={7}
            style={{ textAlign: "left", fontSize: "13px", fontWeight: "500" }}
          >
            ${props.data.symbol} Supply
          </Grid>
          <Grid
            item
            xs={5}
            style={{ textAlign: "right", fontSize: "15px", fontWeight: "700" }}
          >
            {props.data.supply}
          </Grid>
          <Grid
            item
            xs={7}
            style={{ textAlign: "left", fontSize: "13px", fontWeight: "500" }}
          >
            NFTs In Pool
          </Grid>
          <Grid
            item
            xs={5}
            style={{ textAlign: "right", fontSize: "15px", fontWeight: "700" }}
          >
            {props.data.pool}
            {/* {props.data.pool.length} */}
          </Grid>
          <Grid
            item
            xs={7}
            style={{ textAlign: "left", fontSize: "13px", fontWeight: "500" }}
          >
            Price
          </Grid>
          <Grid
            item
            xs={5}
            style={{ textAlign: "right", fontSize: "15px", fontWeight: "700" }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src="./new-images/currency-icon.svg"
                alt="currency"
                style={{ width: "14px", display: "inline", marginRight: "2px" }}
              />
              <span>{props.data.price}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AssetCard;

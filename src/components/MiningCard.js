import "../App.css";
import FilledWideButton from "./FilledWideButton.js";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function MiningCard(props) {
  const history = useHistory();
  const openPage = () => {
    history.push("/pool/" + props.data.symbol);
  };

  const matches = useMediaQuery("(min-width:900px)");
  return (
    <Grid
      container
      xs={11}
      sm={9}
      md={11}
      lg={10}
      className="MiningCard"
      style={{ display: "block" }}
    >
      <Grid
        container
        style={{ width: "auto", margin: "auto", padding: "35px 15px 15px" }}
      >
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`/new-images/${props.data.symbol}.svg`}
              alt="Swap"
              style={{ marginRight: "1rem" }}
            />
            <h2
              style={{
                textAlign: "left",
                margin: "0",
                fontSize: "16px",
                fontWeight: "500",
                color: "#777777",
              }}
            >
              {props.data.name}
            </h2>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "27px",
              fontWeight: "600",
              color: "#777777",
              padding: "25px 0",
            }}
          >
            <span> 0.0</span>

            <p
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#BCBCBC",
              }}
            >
              {props.data.symbol} Staked
            </p>
            <Grid
              container
              wrap="nowrap"
              justify="space-around"
              alignContent="center"
              spacing={1}
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginTop: "2rem",
              }}
            >
              <Grid item xs="auto">
                <FilledWideButton
                  onClick={openPage}
                  style={{
                    fontSize: matches ? "16px" : "11px",
                    fontWeight: "700",
                    padding: matches ? "2px 25px" : "2px 15px",
                    textTransform: "none",
                  }}
                >
                  Stake
                </FilledWideButton>
              </Grid>
              <Grid item xs="auto">
                <FilledWideButton
                  onClick={openPage}
                  style={{
                    fontSize: matches ? "16px" : "11px",
                    fontWeight: "700",
                    padding: matches ? "2px 25px" : "2px 15px",
                    textTransform: "none",
                  }}
                >
                  Unstake
                </FilledWideButton>
              </Grid>
              <Grid item xs="auto">
                <FilledWideButton
                  onClick={openPage}
                  style={{
                    fontSize: matches ? "16px" : "11px",
                    fontWeight: "700",
                    padding: matches ? "2px 25px" : "2px 15px",
                    textTransform: "none",
                  }}
                >
                  Withdraw
                </FilledWideButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            fontSize: "27px",
            fontWeight: "600",
            color: "#777777",
          }}
        ></Grid> */}
        {/* <tr>
          <td>
            <div
              style={{
                width: "67px",
                height: "67px",
                backgroundImage:
                  'url("http://test.nftswaps.io/icons/' +
                  props.data.symbol +
                  '.png")',
                backgroundSize: "cover",
              }}
            ></div>
          </td>
          <td
            style={{
              color: "black",
              fontWeight: "bold",
              maxWidth: "100%",
              whiteSpace: "nowrap",
            }}
          >
            -
          </td>
          <td>
            <div
              className="IconX"
              style={{ width: "60px", height: "60px", lineHeight: "60px" }}
            >
              {props.data.symbol}
            </div>
          </td>
        </tr> */}
      </Grid>
    </Grid>
  );
}

export default MiningCard;

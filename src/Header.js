import React, { useState } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import FilledButton from "./components/FilledButton";
import SwapIcon from "./components/SwapIcon";
import { useHistory, Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import {
  Drawer,
  Button,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
function Header(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const matches = useMediaQuery("(min-width:1200px)");
  const exactMatches = useMediaQuery("(min-width:960px)");
  const history = useHistory();

  const openHome = () => {
    history.push("/");
  };

  const openAssets = () => {
    history.push("/assets");
  };

  const openMining = () => {
    history.push("/mining-staking");
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  if (exactMatches)
    return (
      <div>
        <div
          className="Header"
          style={{ padding: !matches ? "0 3rem" : "0 4rem" }}
        >
          <Grid
            container
            spacing={4}
            justify="space-between"
            alignItems="center"
            style={{
              margin: "auto",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={
                history.location.pathname.includes("pool")
                  ? "/Header_logo.svg"
                  : "./Header_logo.svg"
              }
              alt="logo"
              style={{
                display: "inline-block",
                paddingTop: ".3125rem",
                paddingBottom: ".3125rem",
                marginRight: "1rem",
                fontSize: "1.25rem",
                lineHeight: "inherit",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
              onClick={openHome}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                href="https://dxsale.app/app/pages/dxlockview?id=33&add=0&type=lpdefi&chain=BSC"
                style={{ marginRight: "1.5rem" }}
              >
                <ClearButton style={{ padding: "4px 3rem" }}>
                  Locked Liquidity
                </ClearButton>
              </a>
              {props.coinbase != "" ? (
                <FilledButton
                  startIcon={<SwapIcon />}
                  onClick={openAssets}
                  style={{ padding: "8px 1.5rem" }}
                >
                  {props.coinbase.substr(0, 10) + "..."}
                </FilledButton>
              ) : (
                <FilledButton
                  startIcon={<SwapIcon />}
                  onClick={props.getCoinbase}
                  style={{ padding: "4px 1.5rem" }}
                >
                  Connect Wallet
                </FilledButton>
              )}
              <button
                className="bm-burger-button"
                // style={{ backgroundImage: 'url("/headMenu.svg")' }}
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <img style={{ width: "30px" }} src="/headMenu.svg" />
              </button>
            </div>
          </Grid>
        </div>
        <div className={"slider " + (toggleMenu && "toggle")}>
          <a className="altMenu" href="https://github.com/NFTSwapsio">
            Github
          </a>
          <a className="altMenu" href="http://bit.ly/NFTSwapsPitch">
            Pitch
          </a>
          <Link className="altMenu" to="/mining-staking">
            Mine
          </Link>
          <a className="altMenu" href="https://nftswaps.gitbook.io/nftswaps/">
            Docs
          </a>
          <a
            className="altMenu"
            href="https://nftswaps.gitbook.io/nftswaps/faq"
          >
            FAQ
          </a>
        </div>
      </div>
    );
  else {
    return (
      <div>
        <div
          className="Header"
          style={{
            padding: "0 0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={
              history.location.pathname.includes("pool")
                ? "/Header_logo.svg"
                : "./Header_logo.svg"
            }
            alt="logo"
            style={{
              display: "inline-block",
              paddingTop: ".3125rem",
              paddingBottom: ".3125rem",
              marginRight: "1rem",
              fontSize: "1rem",
              lineHeight: "inherit",
              whiteSpace: "nowrap",
              cursor: "pointer",
              width: "6.5rem",
            }}
            onClick={openHome}
          />
          <div>
            {["top"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  classes={{ root: "menuButtonRoot" }}
                >
                  <img
                    src="/headMenu.svg"
                    alt="menu"
                    style={{ width: "1.2rem" }}
                  />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  classes={{ paper: "drawerPaper mobile" }}
                  onClose={toggleDrawer(anchor, false)}
                >
                  <div
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <Grid
                      container
                      spacing={3}
                      justify="flex-end"
                      style={{ padding: "0.5rem" }}
                    >
                      <Grid item>
                        <a href="https://dxsale.app/app/pages/dxlockview?id=33&add=0&type=lpdefi&chain=BSC">
                          <ClearButton
                            style={{ padding: "4px 0.5rem", fontSize: "12px" }}
                          >
                            Locked Liquidity
                          </ClearButton>
                        </a>
                      </Grid>
                      <Grid item>
                        {props.coinbase != "" ? (
                          <FilledButton
                            startIcon={<SwapIcon />}
                            onClick={openAssets}
                            style={{ padding: "4px 1rem", fontSize: "14px" }}
                          >
                            {props.coinbase.substr(0, 10) + "..."}
                          </FilledButton>
                        ) : (
                          <FilledButton
                            startIcon={<SwapIcon />}
                            onClick={props.getCoinbase}
                            style={{ padding: "4px 1rem", fontSize: "14px" }}
                          >
                            Connect
                          </FilledButton>
                        )}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    />
                    <Grid
                      container
                      spacing={3}
                      justify="flex-end"
                      style={{ padding: "0.5rem" }}
                    >
                      <Grid item button classes={{ root: "drawerAltListItem" }}>
                        <a
                          className="drawerAltMenu"
                          href="https://github.com/NFTSwapsio"
                        >
                          Github
                        </a>
                      </Grid>
                      <Grid item button classes={{ root: "drawerAltListItem" }}>
                        <a
                          className="drawerAltMenu"
                          href="http://bit.ly/NFTSwapsPitch"
                        >
                          Pitch
                        </a>
                      </Grid>
                      <Grid item button classes={{ root: "drawerAltListItem" }}>
                        <Link className="drawerAltMenu" to="/mining-staking">
                          Mine
                        </Link>
                      </Grid>
                      <Grid item button classes={{ root: "drawerAltListItem" }}>
                        <a
                          className="drawerAltMenu"
                          href="https://nftswaps.gitbook.io/nftswaps/"
                        >
                          Docs
                        </a>
                      </Grid>
                      <Grid item button classes={{ root: "drawerAltListItem" }}>
                        <a
                          className="drawerAltMenu"
                          href="https://nftswaps.gitbook.io/nftswaps/faq"
                        >
                          FAQ
                        </a>
                      </Grid>
                    </Grid>
                  </div>
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

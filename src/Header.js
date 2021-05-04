import React, { useState } from 'react';
import './App.css';
import { slide as Menu } from 'react-burger-menu'
import ClearButton from './components/ClearButton'
import FilledButton from './components/FilledButton'
import SwapIcon from './components/SwapIcon'
import { useHistory } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Header(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const history = useHistory();
  const matches = useMediaQuery('(min-width:900px)');

  const openHome = () => {
    history.push("/");
  }

  const openAssets = () => {
    history.push("/assets");
  }

  if(matches)
  return (
    <div>
      <div className="Header">
        <img src="https://nft.nirakara.co.uk/logo.svg" style={{height: "62px", position: "absolute", left: "5%", cursor: "pointer"}} onClick={openHome}/>
        <a href="https://dxsale.app/app/pages/dxlockview?id=33&add=0&type=lpdefi&chain=BSC"><ClearButton style={{margin: "10px 10px"}}>Locked Liquidity</ClearButton></a>
        {props.coinbase != "" ?
        <FilledButton style={{margin: "10px 180px 10px 10px"}} startIcon={<SwapIcon />} onClick={openAssets}>{props.coinbase.substr(0, 10) + "..."}</FilledButton>
        :
        <FilledButton style={{margin: "10px 180px 10px 10px"}} startIcon={<SwapIcon />} onClick={props.getCoinbase}>Connect</FilledButton>
        }
        <button className="bm-burger-button" onClick={() => setToggleMenu(!toggleMenu)}></button>
      </div>
      <div className={"slider " + (toggleMenu && "toggle")}>
      <a style={{color: "#FF7F00", padding: "30px 20px", fontSize: "20px", cursor: "pointer"}} href="https://github.com/NFTSwapsio">Github</a>
      <a style={{color: "#FF7F00", padding: "30px 20px", fontSize: "20px", cursor: "pointer"}} href="http://bit.ly/NFTSwapsPitch">Pitch</a>
      <a style={{color: "#FF7F00", padding: "30px 20px", fontSize: "20px", cursor: "pointer"}} href="">Mine</a>
      <a style={{color: "#FF7F00", padding: "30px 20px", fontSize: "20px", cursor: "pointer"}} href="https://nftswaps.gitbook.io/nftswaps/">Docs</a>
      <a style={{color: "#FF7F00", padding: "30px 20px", fontSize: "20px", cursor: "pointer"}} href="https://nftswaps.gitbook.io/nftswaps/faq">FAQ</a>
      </div>
    </div>
  );
  else{
    return (
      <div>
        <div className="Header">
          <img src="https://nft.nirakara.co.uk/swap.svg" style={{height: "62px", position: "absolute", left: "5%", cursor: "pointer"}} onClick={openHome}/>
          <button className="bm-burger-button" onClick={() => setToggleMenu(!toggleMenu)}></button>
          <Menu>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}} onClick={openAssets}>Launch App</a>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}} href="https://github.com/NFTSwapsio">Github</a>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}} href="http://bit.ly/NFTSwapsPitch">Pitch</a>
            <a href="https://dxsale.app/app/pages/dxlockview?id=33&add=0&type=lpdefi&chain=BSC" style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}}>Locked Liquidity</a>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}}>Mine</a>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}} href="https://nftswaps.gitbook.io/nftswaps/">Docs</a>
            <a style={{color: "#FF7F00", padding: "15px 10px", fontSize: "20px", cursor: "pointer"}} href="https://nftswaps.gitbook.io/nftswaps/faq">FAQ</a>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Header;

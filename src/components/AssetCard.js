import '../App.css';
import FilledWideButton from './FilledWideButton.js'
import { useHistory } from "react-router-dom";

function AssetCard(props) {
  const history = useHistory();
  const openPage = () => {
    history.push("/pool/" + props.data.symbol);
  }

  return (
    <div className="AssetCard">
      <br/><br/>

      <table style={{width: "auto", margin: "auto"}}>
        <tr>
          <td><div style={{width: "67px", height: "67px", backgroundImage: 'url("https://nft.nirakara.co.uk/icons/' + props.data.symbol + '.png")', backgroundSize: "cover"}}></div></td>
          <td style={{color: "black", fontWeight: "bold", maxWidth: "100%", whiteSpace: "nowrap"}}>-</td>
          <td><div className="IconX" style={{width: "60px", height: "60px", lineHeight: "60px"}}>{props.data.symbol}</div></td>
        </tr>
      </table>

      <p><b>{props.data.name} - {props.data.symbol}</b></p>
      <p>Swap {props.data.name} To {props.data.symbol}</p>

      <FilledWideButton onClick={openPage}>Swap</FilledWideButton>

      <table style={{color: "black", margin: "auto", width: "90%"}}>
      <tr> <td>Liquidity</td><td><b>${props.data.liquidity}</b></td> </tr>
      <tr> <td>${props.data.symbol} Supply</td><td><b>{props.data.supply}</b></td> </tr>
      <tr> <td>NFTs In Pool</td><td><b>{props.data.pool.length}</b></td> </tr>
      <tr> <td>Price</td><td><b>{props.data.price} <img src="https://nft.nirakara.co.uk/icons/bnb.svg" style={{width: "14px", display: "inherit"}}/></b></td> </tr>
      </table>

    </div>
  );
}

export default AssetCard;

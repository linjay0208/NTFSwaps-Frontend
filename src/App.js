import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./pages/Home.js";
import Mining from "./pages/Mining.js";
import Assets from "./pages/Assets.js";
import Pool from "./pages/Pool.js";
import Footer from "./Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Web3 from "web3";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import Big from "big.js";

const abi = [
  {
    inputs: [
      { internalType: "address", name: "_vrfCoordinator", type: "address" },
      { internalType: "address", name: "_linkToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "nft", type: "address" },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NewPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "nft", type: "address" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "TokenConvert",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "nft", type: "address" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenMint",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "NftPairs",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "TokenPairs",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "buyTokenPancake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_withdrawalToken", type: "address" },
      { internalType: "uint256", name: "userProvidedSeed", type: "uint256" },
    ],
    name: "claimRandomNFT",
    outputs: [{ internalType: "bytes32", name: "requestId", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "address", name: "_NFT", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_NFT", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "mintToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randomResult",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "requestId", type: "bytes32" },
      { internalType: "uint256", name: "randomness", type: "uint256" },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "sellTokenPancake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenCounts",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "tokenPools",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const factoryAbi = [
  {
    inputs: [
      { internalType: "address", name: "_feeToSetter", type: "address" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      { indexed: false, internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "PairCreated",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "INIT_CODE_PAIR_HASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "allPairs",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "allPairsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
    ],
    name: "createPair",
    outputs: [{ internalType: "address", name: "pair", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeTo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeToSetter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "_feeTo", type: "address" }],
    name: "setFeeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_feeToSetter", type: "address" },
    ],
    name: "setFeeToSetter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

var tokenAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];

const contractAddress = "0x11290a5296175a297288d1fcfe9859dfb9fa905f";
const factoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"; //"0xBCfCcbde45cE874adCB698cC183deBcF17952812"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF7F00",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  const [coinbase, setCoinbase] = useState("");
  const [web3, setWeb3] = useState(null);
  const [state, setState] = useState({
    openError: false,
    openAlert: false,
    message: "",
  });
  const [assets, setAssets] = useState([
    {
      name: "Swaps Socks",
      symbol: "SOCKSX",
      uri: "",
      address: "",
      pair: "",
      liquidity: 100000,
      supply: 2600,
      pool: [],
      price: 1,
    },
    {
      name: "Battle Pets",
      symbol: "PETSX",
      liquidity: 0,
      supply: 200000000,
      pool: [],
      price: 0,
      image: "./new-images/PETSX.svg",
    },
    {
      name: "Lil Moon Rocket",
      symbol: "ROCKX",
      liquidity: 100000,
      supply: 2600,
      pool: [],
      price: 1,
    },
    {
      address: "0x3D8109f586A284743E46B301b3951412c09C5aCA",
      liquidity: "0",
      name: "Test",
      pair: "0x3E48626D0EAAf26508DeBCB022618b1F2F4a1D83",
      pool: ["1", "2"],
      price: "0",
      symbol: "TESTX",
      uri: "http://test.nftswaps.io/sockImages/",
    },
  ]);

  useEffect(() => {
    getCoinbase();
  }, []);

  useEffect(
    (nextProps) => {
      console.log(nextProps);
      console.log(coinbase);
      getAssetList();
    },
    [coinbase]
  );

  const openSnack = (type, message) => {
    if (type == "error") {
      setState({ ...state, openError: true, message: message });
    } else if (type == "success") {
      setState({ ...state, openAlert: true, message: message });
    }
  };

  const handleClose = (type) => {
    if (type == "error") {
      setState({ ...state, openError: false });
    } else if (type == "success") {
      setState({ ...state, openAlert: false });
    }
  };

  const getCoinbase = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum
        .enable()
        .then(() => {
          window.web3.eth.getAccounts().then((e) => {
            setWeb3(window.web3);
            setCoinbase(e[0].toLowerCase());
            getAssetList();
          });
        })
        .catch(() => {
          if (window.BinanceChain) {
            window.web3 = new Web3(window.BinanceChain);
            window.BinanceChain.enable()
              .then(() => {
                window.web3.eth.getAccounts().then((e) => {
                  setWeb3(window.web3);
                  setCoinbase(e[0].toLowerCase());
                  getAssetList();
                });
              })
              .catch(() => {});
          }
        });
    } else if (window.BinanceChain) {
      window.web3 = new Web3(window.BinanceChain);
      window.BinanceChain.enable()
        .then(() => {
          window.web3.eth.getAccounts().then((e) => {
            setWeb3(window.web3);
            setCoinbase(e[0].toLowerCase());
          });
        })
        .catch(() => {});
    }
  };

  const getAssetList = async () => {
    var res = await fetch("http://api.nftswaps.io/getAssets");

    var data = await res.json();
    console.log(data);
    console.log(web3);
    console.log(coinbase);
    if (web3 && coinbase) {
      var factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);
      for (var x = 0; x < data.length; x++) {
        var tokenContract = new web3.eth.Contract(tokenAbi, data[x].pair);
        var wethContract = new web3.eth.Contract(
          tokenAbi,
          "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        );
        var pairContract = await factoryContract.methods
          .getPair(data[x].pair, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c")
          .call();
        console.log(pairContract);
        var totalBNB = await wethContract.methods
          .balanceOf(pairContract)
          .call();
        var totalToken = await tokenContract.methods
          .balanceOf(pairContract)
          .call();
        console.log(totalBNB);
        console.log(totalToken);
        data[x].liquidity = +(web3.utils.fromWei(totalBNB) * 2 * 500).toFixed(
          2
        );
        data[x].supply = web3.utils.fromWei(
          await tokenContract.methods.totalSupply().call()
        );
        var price = new Big(totalBNB).div(new Big(totalToken));
        console.log(price.toString());
        console.log(data[x].supply);
        data[x].price = price.toFixed(4);
      }
    }
    setAssets(data);
    console.log(data);
    return data;
  };

  let hardAssets = [
    {
      pool: 9,
      _id: "609cf0d842a9c32c44e84190",
      name: "SWAPS SOCKS",
      symbol: "SOCKSX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$1,000,000",
      price: "10",
      supply: "2600",
    },
    {
      pool: 100,
      _id: "609cf0d842a9c32c44e84190",
      name: "Battle Pets",
      symbol: "PETSX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$250,324",
      price: "1",
      supply: "1000",
    },
    {
      pool: 1000,
      _id: "609cf0d842a9c32c44e84190",
      name: "Lil Moon Rockets",
      symbol: "ROCKX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$550,666",
      price: "3",
      supply: "13, 337",
    },
    {
      pool: 9,
      _id: "609cf0d842a9c32c44e84190",
      name: "SWAPS SOCKS",
      symbol: "SOCKSX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$1,000,000",
      price: "10",
      supply: "2600",
    },
    {
      pool: 100,
      _id: "609cf0d842a9c32c44e84190",
      name: "Battle Pets",
      symbol: "PETSX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$250,324",
      price: "1",
      supply: "1000",
    },
    {
      pool: 1000,
      _id: "609cf0d842a9c32c44e84190",
      name: "Lil Moon Rockets",
      symbol: "ROCKX",
      uri: "http://api.nftswaps.io/socks/",
      address: "0x96445853eF8fa676c25390c4C81875C1e86fa3Ab",
      pair: "0x7F117Ef9b80273aD8956d041cfD70d4c2A1409d5",
      liquidity: "$550,666",
      price: "3",
      supply: "13, 337",
    },
  ];

  const matches = useMediaQuery("(min-width:768px)");
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Snackbar
          open={state.openAlert}
          autoHideDuration={6000}
          onClose={() => handleClose("success")}
        >
          <Alert severity="success" variant="standard">
            <AlertTitle>Success</AlertTitle>
            <strong>{state.message}</strong>
          </Alert>
        </Snackbar>

        <Snackbar
          open={state.openError}
          autoHideDuration={6000}
          onClose={() => handleClose("error")}
        >
          <Alert severity="error" variant="standard">
            <AlertTitle>Error</AlertTitle>
            {state.message}
          </Alert>
        </Snackbar>

        <Router>
          <Header coinbase={coinbase} getCoinbase={getCoinbase} />
          <div style={{ height: "30px" }}></div>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/mining-staking"
            render={(props) => (
              <Mining
                assetList={hardAssets}
                {...props}
                web3={web3}
                abi={abi}
                contractAddress={contractAddress}
                getAssetList={getAssetList}
                coinbase={coinbase}
                openSnack={openSnack}
              />
            )}
          />
          <Route
            exact
            path="/assets"
            render={(props) => (
              <Assets
                assetList={hardAssets}
                {...props}
                web3={web3}
                abi={abi}
                contractAddress={contractAddress}
                getAssetList={getAssetList}
                coinbase={coinbase}
                openSnack={openSnack}
              />
            )}
          />
          <Route
            exact
            path="/pool/:sym"
            render={(props) => (
              <Pool
                assetList={hardAssets}
                {...props}
                web3={web3}
                abi={abi}
                contractAddress={contractAddress}
                getAssetList={getAssetList}
                coinbase={coinbase}
                openSnack={openSnack}
              />
            )}
          />
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

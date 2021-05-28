import React, { useState, useEffect } from "react";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ClaimButton from "../components/ClaimButton.js";
import GlowingButton from "../components/GlowingButton.js";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TokenCard from "../components/TokenCard.js";
import MintModal from "../components/MintModal.js";
import ClaimModal from "../components/ClaimModal.js";
import SwapModal from "../components/SwapModal.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

var nftAbi = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
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
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "adminMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
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
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

var pancakeAbi = [
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountTokenDesired", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountIn",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsIn",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
    ],
    name: "quote",
    outputs: [{ internalType: "uint256", name: "amountB", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const useStyles = makeStyles({
  paper: {
    background: "#1D1D1D",
    border: 0,
    borderRadius: "10px",
    color: "white",
    fontSize: "18px",
    minWidth: "200px",
    fontWeight: "bold",
    padding: "20px 4rem",
  },
  paperPlain: {
    background: "#FEF6EF",
    border: 0,
    borderRadius: "10px",
    color: "white",
    fontSize: "18px",
    minWidth: "200px",
    fontWeight: "300",
    padding: "10px 20px",
    position: "relative",
  },
  input: {
    borderBottom: "none",
    fontSize: "16px",
    color: "#777777",
  },
});

function Pool(props) {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const [direction, setDirection] = useState(false);
  const [open, setOpen] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  const [openSwaps, setOpenSwaps] = useState(false);
  const [balance, setBalance] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [wethAmount, setWethAmount] = useState(0);
  const [nftAmount, setNftAmount] = useState(0);
  const [assetData, setAssetData] = useState(null);
  const matches = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    getBalance();
  }, [props.coinbase]);

  useEffect(() => {
    console.log("SET ASSET", props.assetList);
    if (props.assetList)
      setAssetData(
        props.assetList.find((e) => e.symbol == props.match.params.sym)
      );
  }, [props.assetList]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClaim = () => {
    setOpenClaim(true);
  };

  const handleCloseClaim = () => {
    setOpenClaim(false);
  };

  const handleOpenSwaps = () => {
    setOpenSwaps(true);
  };

  const handleCloseSwaps = () => {
    setOpenSwaps(false);
  };

  var mockTokens = [
    { img: "/sockImages/0.png" },
    { img: "/sockImages/0.png" },
    { img: "/sockImages/3.png" },
    { img: "/sockImages/0.png" },
  ];

  var handleToggle = (e) => {
    setToggle(!toggle);
  };

  const handleTokenChange = (e) => {
    setTokenAmount(e.target.value);
    setWethAmount(e.target.value * assetData.price);
  };

  const handleWethChange = (e) => {
    setWethAmount(e.target.value);
    setTokenAmount(e.target.value / assetData.price);
  };

  const getBalance = async () => {
    if (props.web3 && props.coinbase != "" && assetData && assetData.pair) {
      var tokenContract = new props.web3.eth.Contract(tokenAbi, assetData.pair);
      var bal = await tokenContract.methods.balanceOf(props.coinbase).call();
      console.log(bal);
      setBalance(props.web3.utils.fromWei(bal.toString()));
      setTokenAmount(props.web3.utils.fromWei(bal.toString()));
    }
  };

  const trySwap = () => {
    if (toggle) {
      if (direction) {
        tradeETHForTokens();
      } else {
        tradeTokenForETH();
      }
    } else {
      if (direction) {
        claimTokens();
      } else {
        mintTokens();
      }
    }
  };

  const tradeTokenForETH = async () => {
    var contract = new props.web3.eth.Contract(
      props.abi,
      props.contractAddress
    );
    var tokenContract = new props.web3.eth.Contract(tokenAbi, assetData.pair);
    var approval = await tokenContract.methods
      .allowance(props.coinbase, props.contractAddress)
      .call();
    console.log(approval);
    if (approval == 0) {
      tokenContract.methods
        .approve(
          props.contractAddress,
          "100000000000000000000000000000000000000000000"
        )
        .send({ from: props.coinbase });
      props.openSnack("error", "Please Await Approval And Try Again");
      return;
    }
    await contract.methods
      .sellTokenPancake(assetData.address, props.web3.utils.toWei(tokenAmount))
      .send({ from: props.coinbase });
    props.openSnack("success", "Tokens Created");
  };

  const tradeETHForTokens = async () => {
    var contract = new props.web3.eth.Contract(
      props.abi,
      props.contractAddress
    );
    var tokenContract = new props.web3.eth.Contract(tokenAbi, assetData.pair);
    var approval = await tokenContract.methods
      .allowance(props.coinbase, props.contractAddress)
      .call();
    console.log(approval);
    if (approval == 0) {
      tokenContract.methods
        .approve(
          props.contractAddress,
          "100000000000000000000000000000000000000000000"
        )
        .send({ from: props.coinbase });
      props.openSnack("error", "Please Await Approval And Try Again");
      return;
    }
    await contract.methods.buyTokenPancake(assetData.address).send({
      from: props.coinbase,
      value: new props.web3.utils.toWei(wethAmount),
    });
    props.openSnack("success", "Tokens Created");
  };

  const mintTokens = async () => {
    handleOpenSwaps();
  };

  const claimTokens = async () => {
    if (!assetData.address) {
      props.openSnack("error", "No Token Data");
      return;
    }
    var contract = new props.web3.eth.Contract(
      props.abi,
      props.contractAddress
    );
    var nftContract = new props.web3.eth.Contract(nftAbi, assetData.address);
    var approval = await nftContract.methods
      .isApprovedForAll(props.coinbase, props.contractAddress)
      .call();
    console.log(approval);
    if (!approval) {
      nftContract.methods
        .setApprovalForAll(props.contractAddress, true)
        .send({ from: props.coinbase });
      props.openSnack("error", "Please Await Approval And Try Again");
      return;
    }
    await contract.methods
      .claimRandomNFT(assetData.address, 1234)
      .send({ from: props.coinbase });
    props.openSnack("success", "Tokens Created");
  };

  function SymbolComponent() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="IconX">{assetData.symbol}</div>
              </td>
              <td
                style={{
                  textAlign: "left",
                  color: "#666666",
                  fontSize: "16px",
                  fontWeight: "400",
                  marginBottom: "0px",
                }}
              >
                {assetData.symbol}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function TokenNameComponent() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: "50px",
                    width: "40px",
                    height: "40px",
                    marginRight: "0px",
                    backgroundImage: `url("/new-images/${assetData.name}.svg")`,
                    backgroundSize: "cover",
                  }}
                />
              </td>
              <td
                style={{
                  textAlign: "left",
                  color: "#666666",
                  fontSize: "16px",
                  fontWeight: "400",
                  marginBottom: "0px",
                }}
              >
                {assetData.name}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function BnbComponent() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    border: "0px solid black",
                    borderRadius: "50px",
                    width: "40px",
                    height: "40px",
                    marginRight: "0px",
                    backgroundImage: 'url("/new-images/currency-icon.svg")',
                    backgroundSize: "cover",
                  }}
                />
              </td>
              <td
                style={{
                  textAlign: "left",
                  color: "#666666",
                  fontSize: "16px",
                  fontWeight: "400",
                  marginBottom: "0px",
                }}
              >
                BNB
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (assetData && matches)
    return (
      <div className="Pool" style={{ marginTop: "4rem", paddingTop: "3rem" }}>
        <MintModal
          getBalance={getBalance}
          open={open}
          openSnack={props.openSnack}
          handleClose={handleClose}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <SwapModal
          getBalance={getBalance}
          open={openSwaps}
          openSnack={props.openSnack}
          handleClose={handleCloseSwaps}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <ClaimModal
          getBalance={getBalance}
          open={openClaim}
          openSnack={props.openSnack}
          handleClose={handleCloseClaim}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
            <Grid container spacing={1} wrap="nowrap">
              <Grid item xs="auto">
                <div
                  style={{
                    border: "1px solid white",
                    borderRadius: "50px",
                    width: "50px",
                    height: "50px",
                    marginRight: "0px",
                    backgroundImage: `url("/new-images/${assetData.name}.svg")`,
                    backgroundSize: "cover",
                  }}
                />
              </Grid>
              <Grid item xs="auto">
                <h2
                  style={{
                    textAlign: "left",
                    margin: "0",
                    color: "white",
                    fontSize: "32px",
                    fontWeight: "700",
                  }}
                >
                  {assetData.name}
                </h2>

                <div style={{ color: "white" }}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>Liquidity</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div>${assetData.liquidity}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>${assetData.symbol} Supply</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div> {assetData.supply}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>NFTs In Pool</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div> {assetData.pool}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>Price</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <img
                          src="/new-images/currency-icon.svg"
                          alt="currency"
                          style={{
                            width: "14px",
                            display: "inline",
                            marginRight: "2px",
                          }}
                        />
                        <span>{assetData.price}</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6} style={{ textAlign: "right" }}>
            <ClaimButton onClick={handleOpenClaim}>🔥claim</ClaimButton>
            <br />
            <br />
            {assetData.symbol == "SOCKSX" && (
              <ClaimButton onClick={handleOpen}>MINT</ClaimButton>
            )}
          </Grid>

          <Grid item xs={12} md={12} style={{ marginTop: "1rem" }}>
            <Paper elevation={3} className={classes.paper}>
              <div className="swap-toggle-section desktop-section">
                <span>Swap "SWAP SOCKS" for $SOCKSX</span>
                <div className="toggle-swtich">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="deskToggle"
                      value={toggle}
                      onChange={handleToggle}
                    />
                    <span className="slider" style={{ height: "30px" }}></span>
                  </label>
                </div>
              </div>

              <Grid container spacing={4} alignItems="center">
                <Grid item xs={5} md={5}>
                  <Paper elevation={3} className={classes.paperPlain}>
                    <h3
                      style={{
                        textAlign: "left",
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        marginBottom: "0px",
                      }}
                    >
                      From
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          classes: { input: classes.input },
                        }}
                        className={classes.input}
                        value={direction ? wethAmount : tokenAmount}
                        onChange={handleTokenChange}
                      />

                      {toggle ? (
                        <React.Fragment>
                          {direction ? (
                            <BnbComponent></BnbComponent>
                          ) : (
                            <SymbolComponent></SymbolComponent>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {direction ? (
                            <SymbolComponent></SymbolComponent>
                          ) : (
                            <TokenNameComponent></TokenNameComponent>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={2} md={2}>
                  <img
                    src="/new-images/convert-arrow-icon.svg"
                    alt="convert-arrow"
                    style={{
                      cursor: "pointer",
                      width: "35px",
                    }}
                    onClick={() => setDirection(!direction)}
                  />
                </Grid>

                <Grid item xs={5} md={5}>
                  <Paper elevation={3} className={classes.paperPlain}>
                    <h3
                      style={{
                        textAlign: "left",
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        marginBottom: "0px",
                      }}
                    >
                      To
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          classes: { input: classes.input },
                        }}
                        className={classes.input}
                        value={direction ? tokenAmount : wethAmount}
                        onChange={handleWethChange}
                      />
                      {toggle ? (
                        <React.Fragment>
                          {direction ? (
                            <SymbolComponent></SymbolComponent>
                          ) : (
                            <BnbComponent></BnbComponent>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {direction ? (
                            <TokenNameComponent></TokenNameComponent>
                          ) : (
                            <SymbolComponent></SymbolComponent>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </Paper>
                </Grid>
              </Grid>

              <br />
              <br />
              <GlowingButton onClick={toggle ? null : trySwap}>
                Swap
              </GlowingButton>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} style={{ marginTop: "5rem" }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <div
                  style={{
                    border: "1px solid white",
                    borderRadius: "50px",
                    width: "50px",
                    height: "50px",
                    marginRight: "0px",
                    backgroundImage: `url("/new-images/${assetData.name}.svg")`,
                    backgroundSize: "cover",
                  }}
                />
              </Grid>
              <Grid item>
                <h2
                  style={{
                    margin: "0",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  ASSETS IN POOL
                </h2>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={4} style={{ marginTop: "2rem" }}>
            {mockTokens.map((e, i) => {
              return (
                <Grid
                  item
                  xs={6}
                  md={4}
                  key={`tokenCard-${i}`}
                  style={{ padding: "16px 0" }}
                >
                  <TokenCard url={e.img}>
                    <img src={e.img} alt="Name" style={{ width: "100%" }}></img>
                  </TokenCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
      </div>
    );
  else if (assetData && !matches) {
    return (
      <div
        className="Pool"
        style={{
          marginTop: "4rem",
          paddingTop: "1rem",
          paddingBottom: "37rem",
        }}
      >
        <br />
        <br />
        <br />
        <MintModal
          getBalance={getBalance}
          open={open}
          openSnack={props.openSnack}
          handleClose={handleClose}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <SwapModal
          getBalance={getBalance}
          open={openSwaps}
          openSnack={props.openSnack}
          handleClose={handleCloseSwaps}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <ClaimModal
          getBalance={getBalance}
          open={openClaim}
          openSnack={props.openSnack}
          handleClose={handleCloseClaim}
          web3={props.web3}
          abi={props.abi}
          contractAddress={props.contractAddress}
          getAssetList={props.getAssetList}
          coinbase={props.coinbase}
          address={assetData.address}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <div
                  style={{
                    border: "1px solid white",
                    borderRadius: "50px",
                    width: "60px",
                    height: "60px",
                    margin: "auto",
                    backgroundImage: `url("/new-images/${assetData.name}.svg")`,
                    backgroundSize: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <h2
                  style={{
                    textAlign: "center",
                    margin: "0",
                    color: "white",
                    fontSize: "32px",
                    fontWeight: "700",
                  }}
                >
                  {assetData.name}
                </h2>
                <div
                  style={{
                    color: "white",
                    maxWidth: "250px",
                    margin: "auto",
                    marginTop: "1rem",
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>Liquidity</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div>${assetData.liquidity}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>${assetData.symbol} Supply</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div> {assetData.supply}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>NFTs In Pool</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div> {assetData.pool.length}</div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      style={{
                        textAlign: "left",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div>Price</div>
                    </Grid>
                    <Grid
                      item
                      style={{
                        textAlign: "right",
                        marginLeft: "4rem",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <img
                          src="/new-images/currency-icon.svg"
                          alt="currency"
                          style={{
                            width: "14px",
                            display: "inline",
                            marginRight: "2px",
                          }}
                        />
                        <span>{assetData.price}</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            <ClaimButton onClick={handleOpenClaim}>🔥claim</ClaimButton>
            <br />
            <br />
            {assetData.symbol == "SOCKSX" &&
              props.coinbase ==
                "0x2f5296f74B5D46F195a3cFC254B4cAD6EdF111ff".toLowerCase() && (
                <ClaimButton onClick={handleOpen}>MINT</ClaimButton>
              )}
          </Grid>

          <Grid item xs={12} md={12} style={{ marginTop: "2rem" }}>
            <Paper elevation={3} className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Paper elevation={3} className={classes.paperPlain}>
                    <h3
                      style={{
                        textAlign: "left",
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        marginBottom: "0px",
                      }}
                    >
                      From
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          classes: { input: classes.input },
                        }}
                        className={classes.input}
                        value={toggle ? tokenAmount : nftAmount}
                      />

                      {toggle ? (
                        <React.Fragment>
                          {direction ? (
                            <BnbComponent></BnbComponent>
                          ) : (
                            <SymbolComponent></SymbolComponent>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {direction ? (
                            <SymbolComponent></SymbolComponent>
                          ) : (
                            <TokenNameComponent></TokenNameComponent>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={2}>
                  <img
                    src="/new-images/convert-arrow-icon.svg"
                    alt="arrow"
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                      width: "50px",
                    }}
                    className="inverseM"
                    onClick={() => setDirection(!direction)}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Paper elevation={3} className={classes.paperPlain}>
                    <h3
                      style={{
                        textAlign: "left",
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        marginBottom: "0px",
                      }}
                    >
                      {direction ? "From" : "To"}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          classes: { input: classes.input },
                        }}
                        className={classes.input}
                        value={toggle ? wethAmount : tokenAmount}
                      />

                      {toggle ? (
                        <React.Fragment>
                          {direction ? (
                            <SymbolComponent></SymbolComponent>
                          ) : (
                            <BnbComponent></BnbComponent>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {direction ? (
                            <TokenNameComponent></TokenNameComponent>
                          ) : (
                            <SymbolComponent></SymbolComponent>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              <div
                className="swap-toggle-section desktop-section"
                style={{ display: "flex", marginTop: "1rem" }}
              >
                <span style={{ textAlign: "left" }}>
                  Swap "SWAP SOCKS" for $SOCKSX
                </span>
                <div className="toggle-swtich">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="deskToggle"
                      value={toggle}
                      onChange={handleToggle}
                    />
                    <span className="slider" style={{ height: "30px" }}></span>
                  </label>
                </div>
              </div>
              <br />
              <GlowingButton
                onClick={toggle ? null : trySwap}
                style={{ marginTop: "1rem" }}
              >
                Swap
              </GlowingButton>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} style={{ marginTop: "5rem" }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <div
                  style={{
                    border: "1px solid white",
                    borderRadius: "50px",
                    width: "50px",
                    height: "50px",
                    marginRight: "0px",
                    backgroundImage: `url("/new-images/${assetData.name}.svg")`,
                    backgroundSize: "cover",
                  }}
                />
              </Grid>
              <Grid item>
                <h2
                  style={{
                    margin: "0",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  ASSETS IN POOL
                </h2>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={4} style={{ marginTop: "2rem" }}>
            {mockTokens.map((e, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={`tokenCard-${i}`}
                  style={{ padding: "16px 0" }}
                >
                  <TokenCard url={e.img}>
                    <img src={e.img} alt="Name" style={{ width: "100%" }}></img>
                  </TokenCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div className="Pool" style={{ height: "100vh" }}>
        <h1>TOKEN NOT FOUND {assetData}</h1>
      </div>
    );
  }
}

export default Pool;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var fs = require('fs');
var util = require('util')
var http = require('http');
var cors = require('cors');
var Web3 = require('web3');
//require('dotenv').config({ path: './.env.production' })
var abiDecoder = require("abi-decoder");
var nodemailer = require('nodemailer');
app.use(cors())
app.set('trust proxy', true)
const crypto = require('crypto');
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/swap', { useNewUrlParser: true, useUnifiedTopology: true });
//const Big = require('big.js');

const abi = [{"inputs":[{"internalType":"address","name":"_linkToken","type":"address"},{"internalType":"address","name":"_rngAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"string","name":"symbol","type":"string"},{"indexed":false,"internalType":"address","name":"erc20","type":"address"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"TokenConvert","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenMint","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NftPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"TokenPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nameMap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"requester","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenCounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenPools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"withdrawalToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_swapAddress","type":"address"},{"internalType":"address","name":"_newAddress","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_withdrawalToken","type":"address"},{"internalType":"uint256","name":"userProvidedSeed","type":"uint256"}],"name":"claimRandomNFT","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"fulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_NFT","type":"address"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_NFT","type":"address"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"mintToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"buyTokenPancake","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"sellTokenPancake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const sockAbi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"sockContract","type":"address"},{"internalType":"address[]","name":"whitelisted","type":"address[]"},{"internalType":"address[]","name":"blacklisted","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ClaimRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"uint256[]","name":"amount","type":"uint256[]"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminCommonMintCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"adminMintCommon","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"adminMintRare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminRareMintCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"batchOne","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimPhysical","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claimSocks","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isRare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

//let web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
let web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));

abiDecoder.addABI(abi);

const AssetList = mongoose.model("assetList", new mongoose.Schema({
  name: String,
  symbol: String,
  uri: String,
  address: String,
  pair: String,
  liquidity: String,
  price: String,
  pool: [String]
}));

const SockList = mongoose.model("sockList", new mongoose.Schema({
  index: Number,
  image: String
}));

app.use(bodyParser.urlencoded({extended: false, limit: '55mb'}));
app.use(bodyParser.json({limit: '55mb'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

var server = http.createServer(app);
//var io = require('socket.io').listen(server);
/*
io.on('connection', (socket) => {
});*/

var test = async () => {
  var assets = await AssetList.find();
  console.log(assets);
  //assets[0].uri = "http://api.nftswaps.io/socks/"
  assets[1].pool = [1, 2, 3]
  assets[1].markModified("pool")
  assets[1].save()
  //assets[1].remove();
  var assets = await SockList.find();
  //console.log(assets);
  /*for(var x = 0; x < assets.length; x++){
    assets[x].image = "http://test.nftswaps.io/sockImages/" + x + ".png"
    assets[x].save();
  }*/
}

test();

async function sendMail(to, subject, message){
  return;
var smtpTransport = nodemailer.createTransport("smtps://email%40gmail.com:"+encodeURIComponent('pass') + "@smtp.gmail.com:465");

var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
}
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        //res.redirect('/');
        console.log("msg sent")
    }
});
}

async function contractWatcher(){
  var baeContract = new web3.eth.Contract(abi, "0x7F93A8c5Bad8Bbb82e3e796074Fc8F1d6020df32");//"0xc41b2eD0A8E74885302b6cf168Bd64991a9Ec52a")
  var block = fs.readFileSync('blockNumber.txt','utf8')
  baeContract.getPastEvents('allEvents', {
      fromBlock: block,
      toBlock: 'latest'
  }, function(error, events){ /*console.log(events);*/ })
  .then(async function(events){
      for(let x = 0; x < events.length; x++){
        if(events[x].event == "NewPair"){
          var asset = await AssetList.create({
            name: events[x].returnValues.name,
            symbol: events[x].returnValues.symbol,
            uri: events[x].returnValues.uri,//"https://nft.nirakara.co.uk/sockImages/",
            address: events[x].returnValues.nft,
            pair: events[x].returnValues.erc20,
            liquidity: 0,
            price: 0,
            pool: (events[x].returnValues.ids ? events[x].returnValues.ids : [])
          })
          fs.writeFile('blockNumber.txt', (events[x].blockNumber + 1).toString(), function (err) {
            if (err) return console.log(err);
          });
        }
        else if(events[x].event == "TokenMint"){
          var asset = await AssetList.findOne({address: events[x].returnValues.nft});
          asset.pool.push(events[x].returnValues.id);
          asset.markModified("pool");
          asset.save();
          console.log(asset.pool)
          fs.writeFile('blockNumber.txt', (events[x].blockNumber + 1).toString(), function (err) {
            if (err) return console.log(err);
          });
        }
        else if(events[x].event == "TokenConvert"){
          var asset = await AssetList.findOne({address: events[x].returnValues.nft});
          asset.pool.splice(asset.pool.indexOf(events[x].returnValues.id), 1);
          asset.markModified("pool");
          asset.save();
          fs.writeFile('blockNumber.txt', (events[x].blockNumber + 1).toString(), function (err) {
            if (err) return console.log(err);
          });
        }

      }
  })
  .catch((e) => {
    console.log(e)
  })
}

setInterval(contractWatcher, 6000);

async function sockWatcher(){
  var baeContract = new web3.eth.Contract(sockAbi, "0xa657060F2fcCaD30dea82ECB50812033183d6208");//"0xc41b2eD0A8E74885302b6cf168Bd64991a9Ec52a")
  var block = fs.readFileSync('blockNumber2.txt','utf8')
  baeContract.getPastEvents('allEvents', {
      fromBlock: block,
      toBlock: 'latest'
  }, function(error, events){ /*console.log(events);*/ })
  .then(async function(events){
      for(let x = 0; x < events.length; x++){
        if(events[x].event == "Transfer"){
          if(events[x].returnValues.from == "0x0000000000000000000000000000000000000000"){
            var rarity = await baeContract.methods.isRare(events[x].returnValues.tokenId).call();
            var asset = await SockList.create({
              index: events[x].returnValues.tokenId,
              image: "http://test.nftswaps.io/sockImages/" + rarity.toString() + ".png"
            })
            fs.writeFile('blockNumber2.txt', (events[x].blockNumber + 1).toString(), function (err) {
              if (err) return console.log(err);
            });
          }

        }
      }
  })
  .catch((e) => {
    console.log(e)
  })
}

setInterval(sockWatcher, 6000);

app.get("/getAssets", async (req, res) => {
  var assets = await AssetList.find();
  res.send(assets)
})

app.get("/socks/:id", async (req, res) => {
  var assets = await SockList.findOne({index: req.params.id});
  res.send(assets)
})

server.listen(3001);

console.log('API Running On Port 3001');

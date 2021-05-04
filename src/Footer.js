import './App.css';
import Grid from '@material-ui/core/Grid';
import { Twitter, Telegram } from '@material-ui/icons';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
  return (
    <div className="Footer">
    <br/>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <p className="footerLinks">NFTSwaps is a product of Blockchain4Africa Limited. The company is created to provide e-commerce services, Internet Marketing, ICT, and blockchain-based services. The Blockchain4africa team has been active in multiple projects in the Blockchain industry and have extensive experience with DAPP development. Our team is composed of multiple blockchain experts from all around the world focused and dedicated to bringing you a transparent and provably fair blockchain-based decentralized platform.</p>
        </Grid>
        <Grid item xs={12} md={4} style={{textAlign: "left", fontFamily: "Poppins"}}>
          <h3 className="footerTitles">Socials</h3>
          <a target="_blank" href="https://nftswaps.medium.com/"><div className="footerIcon" style={{marginRight: "5px"}}/></a>
          <a target="_blank" href="https://twitter.com/nftswaps_io"><img src="https://nft.nirakara.co.uk/twitter-circular-button.svg"/></a>
          <a target="_blank" href="https://t.me/nftswaps_io"><div className="footerIcon" style={{backgroundImage: 'url("https://nft.nirakara.co.uk/telegram-plane.svg")', marginLeft: "5px"}}/></a>
          {<a target="_blank" href="https://www.youtube.com/c/NFTSwapsOfficial"><GitHubIcon className="footerIcon" style={{color: '#FF7F00', marginLeft: "5px", backgroundImage: "none"}}/></a>}
          {<a target="_blank" href="https://www.youtube.com/c/NFTSwapsOfficial"><YouTubeIcon className="footerIcon" style={{color: '#FF7F00', marginLeft: "5px", backgroundImage: "none"}}/></a>}
        </Grid>
        <Grid item xs={12} md={3}>
          <h3 className="footerTitles">Quick Links</h3>
          <p style={{cursor: "pointer"}} className="footerLinks">HOME</p>
          <p style={{cursor: "pointer"}} className="footerLinks">FEATURES</p>
          <p style={{cursor: "pointer"}} className="footerLinks">HOW IT WORKS</p>
          <p style={{cursor: "pointer"}} className="footerLinks">TERMS AND CONDITIONS</p>
        </Grid>
      </Grid>
      <br/><br/>
      <p style={{fontFamily: "Mulish", fontWeight: 300}}>© 2021 NFTSwaps All Right Reserved</p>
      <br/>
    </div>
  );
}

export default Footer;

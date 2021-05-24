import "../App.css";

function TokenCard(props) {
  return (
    <div
      className="TokenCard"
      // style={{
      //   backgroundImage: "url('" + props.url + "')",
      //   backgroundSize: "110%",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   height: props.mobile && "100vw",
      // }}
    >
      {props.children}
    </div>
  );
}

export default TokenCard;

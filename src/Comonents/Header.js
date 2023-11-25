import React from "react";
import img from "../Resources/troll-face.png";

export default function Header() {
  return (
    <div className="header">
      <img className="header-img" src={img} alt="" />
      <h3 className="header-title">Meme Generator</h3>
      <h6 className="header-project">React Course - Project 3</h6>
    </div>
  );
}

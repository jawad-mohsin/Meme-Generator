import React from "react";
import axios from "axios";

export default function Form() {
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setAllMemeImages(response.data.data.memes);
    }
    getData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  //Code for handling dragging of top and bottom text
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function handleDrop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);

    if (draggedElement && draggedElement.classList.contains("movable-text")) {
      const { offsetX, offsetY } = event.nativeEvent;

      const newX = offsetX - draggedElement.offsetWidth / 2;
      const newY = offsetY - draggedElement.offsetHeight / 2;

      draggedElement.style.transition = "all 0.3s"; // Add a transition effect
      draggedElement.style.position = "absolute";
      draggedElement.style.left = newX + "px";
      draggedElement.style.top = newY + "px";

      // Reset the transition property after the transition ends
      draggedElement.addEventListener(
        "transitionend",
        () => {
          draggedElement.style.transition = "none";
        },
        { once: true }
      );
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <main>
      <div className="input-form">
        <input
          className="form-first-input"
          type="text"
          placeholder="Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form-second-input"
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form-generate-button">
          Get a new meme image 🖼️
        </button>
      </div>
      <div
        className="meme-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img id="meme-img" className="meme-img" src={meme.randomImage} alt="" />
        <h2
          id="top-text"
          className="top-text movable-text"
          draggable="true"
          onDragStart={handleDragStart}
        >
          {meme.topText}
        </h2>
        <h2
          id="bottom-text"
          className="bottom-text movable-text"
          draggable="true"
          onDragStart={handleDragStart}
        >
          {meme.bottomText}
        </h2>
      </div>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import "./styles.css";

const Home = () => {
    // Correctly initializing useState
    const [slideIndex, setSlideIndex] = useState(1); // 1 is the initial slide index
  
    // Function to show the current slide
    const showSlides = (n) => {
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
  
      if (n > slides.length) { setSlideIndex(1); }
      if (n < 1) { setSlideIndex(slides.length); }
  
      Array.from(slides).forEach(slide => (slide.style.display = "none"));
      Array.from(dots).forEach(dot => (dot.className = dot.className.replace(" active", "")));
  
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    };
  
    // Function to move to the next/previous slide
    const plusSlides = (n) => {
      setSlideIndex((prev) => (prev + n) % 3 || 3);  // Assuming 3 slides
    };
    useEffect(() => {
      const timer = setInterval(() => {
          plusSlides(1);
      }, 3500); // 5 seconds delay
  
      return () => clearInterval(timer); // Cleanup
  }, []);
    // Function to go to a specific slide
    const currentSlide = (n) => {
      setSlideIndex(n);
    };
  
    // UseEffect hook to initialize the slideshow
    useEffect(() => {
      showSlides(slideIndex);
    }, [slideIndex]); // Update when slideIndex changes
  
  return (
    <div>
      <div className="container">
        <div className="slideshow-container" style={{ marginTop: "3.9em" }}>
          <div className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img
              src="static/images/balmond-bioroid-starlight-skin-mobile-legends-2k-wallpaper-uhdpaper.com-732@0@f.jpg"
              alt="Balmond"
              style={{ width: "100%" }}
            />
            <div className="text">Balmond</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img
              src="static/images/dyrroth-venom-mobile-legends-skin-2k-wallpaper-uhdpaper.com-331@1@g.jpg"
              alt="Dyroth"
              style={{ width: "100%" }}
            />
            <div className="text">Dyroth</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img
              src="static/images/xavier-mobile-legends-2k-wallpaper-uhdpaper.com-334@1@g.jpg"
              alt="Xavier"
              style={{ width: "100%" }}
            />
            <div className="text">Xavier</div>
          </div>

          <button className="prev" onClick={() => plusSlides(-1)}>
            &#10094;
          </button>
          <button className="next" onClick={() => plusSlides(1)}>
            &#10095;
          </button>
        </div>

        <br />

        {/* The dots/circles */}
        <div style={{ textAlign: "center" }}>
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
        </div>

        <h2 className="h2game">Games</h2>
        <div className="grid-container-home container" >
          <div className="card grid-item-home">
            <a href="/mobilelegends" className="Item__link">
              <div className="product-container">
                <img
                  src="static/images/mobile legends.png"
                  alt="Mobile Legends"
                  className="image"
                />
                <span className="Item__price">Moba Legends 5V5</span>
              </div>
            </a>
          </div>

          <div className="card grid-item-home">
            <a href="/Genshin" className="Item__link">
              <div className="product-container">
                <img
                  src="static/images/Genshin_Impact.png"
                  alt="Genshin Impact"
                  className="image"
                />
                <span className="Item__price">Genshin Impact</span>
              </div>
            </a>
          </div>

          <div className="card grid-item-home">
            <a href="/Honkai" className="Item__link">
              <div className="product-container">
                <img
                  src="static/images/honkai star rail.avif"
                  alt="Honkai Star Rail"
                  className="image"
                />
                <span className="Item__price">Honkai Star Rail</span>
              </div>
            </a>
          </div>

          <div className="card grid-item-home">
            <a href="#" className="Item__link">
              <div className="product-container">
                <img
                  src="static/images/clash of clans.jpg"
                  alt="Clash of Clans"
                  className="image"
                />
                <span className="tag">Coming soon!</span>
                <span className="Item__price">Clash of Clans</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

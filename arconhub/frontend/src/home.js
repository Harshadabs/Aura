import React, { useState, useEffect } from "react";
import "./styles.css";
import "./login.css";
import "./gamepage.css";

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
        <div class="container">
    <div class="slideshow-container" style={{marginTop: '3.9em'}}>
      <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img 
        src="static/images/balmond-bioroid-starlight-skin-mobile-legends-2k-wallpaper-uhdpaper.com-732@0@f.jpg" 
        style={{width :'100%'}}
        />
        <div class="text">Balmond</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">2 / 3</div>
        <img 
        src="static/images/dyrroth-venom-mobile-legends-skin-2k-wallpaper-uhdpaper.com-331@1@g.jpg" 
        style={{width :'100%'}}
        />
        <div class="text">Dyroth</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">3 / 3</div>
        <img
        src="static/images/xavier-mobile-legends-2k-wallpaper-uhdpaper.com-334@1@g.jpg"
        style={{width :'100%'}}
        />
        <div class="text">Xavier</div>
      </div>

      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>

    <br/>
    <div style={{textAlign:'center'}}>
      <span class="dot" onclick="currentSlide(1)"></span>
      <span class="dot" onclick="currentSlide(2)"></span>
      <span class="dot" onclick="currentSlide(3)"></span>
    </div>
    <h2 class="h2game">Games</h2>
    <div class="grid-container-home container">
      <div class="card grid-item-home">
        <a href='/mobilelegends' class="Item__link_home">
          <div class="product-container">
            <img 
            src="static/images/mobile legends.png"
            alt="Mobile Legends"
            class="image"
            />
          </div>
            <span class="Item__price_home">Moba Legends 5V5</span>
        </a>
      
    </div>

    <div class="card grid-item-home">
      <a href='/Genshin' class="Item__link_home">
        <div class="product-container">
          <img
          src="static/images/Genshin_Impact.png" 
          alt="Genshin Impact" 
          class="image"
          />
        </div>
        <span class="Item__price_home">Genshin Impact</span>
      </a>
    </div>

    <div class="card grid-item-home">
      <a href='/honkai' class="Item__link_home">
        <div class="product-container">
          <img
          src="static/images/honkai star rail.avif"
          alt="Honkai star rail"
          class="image"
          />
        </div>
        <span class="Item__price_home">Honkai Star Rail</span>
      </a>
    </div>

    <div class="card grid-item-home">
      <a href="#" class="Item__link_home">
        <div class="product-container">
          <img 
          src="static/images/clash of clans.jpg"
          alt="Clash of Clans"
          class="image"
          />
        </div>
        <span class="tag display-topleft coc ">Coming soon !</span>
        <span class="Item__price_home">Clash of Clans</span>
      </a>
    </div>
  </div>
  </div>
  </div>
  );
};

export default Home;

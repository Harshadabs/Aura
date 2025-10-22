import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AboutUs from '../components/AboutUs';
import Feedback from '../components/Feedback';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Products />
      <AboutUs />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;

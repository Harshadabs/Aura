import { motion } from "framer-motion";

import Hero from "../components/Hero";
import Products from "../components/Products";
import AboutUs from "../components/AboutUs";
import Feedback from "../components/Feedback";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <AboutUs />
      <Feedback />
    </>
  );
}

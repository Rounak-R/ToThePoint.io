import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BodySection from "./components/userinput/BodySection";

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col ">
      <Header />
      <BodySection />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

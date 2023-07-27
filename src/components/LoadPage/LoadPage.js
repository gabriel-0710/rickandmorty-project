import React from 'react';
import loadingImage from '../card.png';
import logoHome from "../logo-Home.png";
import './LoadPage.css';

const LoadPage = () => {
  return (
    <div className="loadSetting">
      <img className="imagemLogo" src={logoHome} alt="logoPrincipal" />
      
      <img src={loadingImage} alt="Loading" />
      <p className="loadText">Loading</p>
    </div>
  );
};

export default LoadPage;
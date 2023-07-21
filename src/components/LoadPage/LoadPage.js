import React from 'react';
import loadingImage from '../card.png';
import './LoadPage.css';

const LoadPage = () => {
  return (
    <div className="loadSetting">
      <img src={loadingImage} alt="Loading" />
      <p className="loadText">Loading</p>
    </div>
  );
};

export default LoadPage;
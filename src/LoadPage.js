import React from 'react';
import loadingImage from './components/load-page.png';
import './LoadPage.css';

const LoadPage = () => {
  return (
    <div>
      <img src={loadingImage} alt="Loading" />
    </div>
  );
};

export default LoadPage;
import React from 'react';
import loadingImage from './components/load-page.png';
import './LoadPage.css';

const LoadPage = () => {
  return (
    <div>
      <img src={loadingImage} alt="Loading" />
      {/* You can put any other loading content here */}
    </div>
  );
};

export default LoadPage;
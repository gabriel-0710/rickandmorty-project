import React, { useState } from 'react';
import logoHome from './components/logo-Home.png';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/search?query=' + encodeURIComponent(searchTerm));
      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    
    <div className="App">
      <div className="App-header">
        <img src={logoHome} alt="logo" />
        <div className="inside-App-Header">
          <input
            type="text"
            placeholder="Search characters"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <br />
          <button onClick={handleSearch}>Search</button>

          {searchResults.length > 0 && (
            <div>
              <h2>Search Results:</h2>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.status}>{result.status}</li>  
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
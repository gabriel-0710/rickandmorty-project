import React, { useState } from 'react';
import logoHome from './components/logo-Home.png';
import LoadPage from './LoadPage'; // Import the LoadPage component

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false); // New state for tracking search execution

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchExecuted(true); // Set searchExecuted to true when the search is executed

    try {
      const response = await fetch('http://localhost:5000/search?query=' + encodeURIComponent(searchTerm));
      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      {searchExecuted ? (
        isLoading ? (
          <LoadPage /> // Display the loading page when the search is executed and isLoading is true
        ) : (
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
        )
      ) : (
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
            <button onClick={() => setSearchExecuted(true)}>Search</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
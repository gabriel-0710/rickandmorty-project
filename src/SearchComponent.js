import React, { useState } from "react";
import logoHome from "./components/logo-Home.png";
import LoadPage from "./LoadPage"; // Import the LoadPage component

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false); // New state for tracking search execution

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchExecuted(true); // Set searchExecuted to true when the search is executed

    try {
      const response = await fetch(
        "http://localhost:5000/search?query=" + encodeURIComponent(searchTerm)
      );
      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (<LoadPage/>)    
  }

  return (
    <div className="App">
      {searchExecuted ? (
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
            </div>
            {searchResults.length > 0 && (
              <div className="results">
                {searchResults.map((result) => (
                  <div className="card" key={result.id}>
                    <div
                      className="cardImage"
                      style={{ backgroundImage: `url(${result.image_url})` }}
                    />

                    <div className="cardText">
                      <p className="cardTextName">{result.name}</p>
                      <p className="cardTextSpecies">{result.species}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      : (
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

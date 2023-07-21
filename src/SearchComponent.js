import React, { useState } from "react";
import logoHome from "./components/logo-Home.png";
import LoadPage from "./components/LoadPage/LoadPage"; // Import the LoadPage component

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleSearch = async (_, page) => {
    setIsLoading(true);
    setSearchExecuted(true);
    console.log(page);

    try {
      const response = await fetch(
        "http://localhost:5000/search?query=" +
          encodeURIComponent(searchTerm) +
          "&page=" +
          encodeURIComponent(page || 1)
      );
      const data = await response.json();
      setSearchResults(data.results);
      setTotalPage(data.total_pages);
      setCurrentPage(page || 1);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadPage />;
  }

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
        </div>
        {searchExecuted && searchResults.length > 0 && (
          <div>
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
            <div className="paginationSetting">
              <a href=""> - </a>
              {[...Array(totalPage).keys()].map((number) => {
                const className= number + 1 === currentPage? 'buttonFooter selected' : 'buttonFooter';
                return (
                  <button className={className}
                    key={number + "pagination"}
                    onClick={(event) => {
                      handleSearch(event, number + 1);
                    }}
                  >
                    {number + 1}
                  </button>
                );
              })}
              <a href=""> + </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

import React, { useState } from "react";
import logoHome from "./components/logo-Home.png";
import LoadPage from "./components/LoadPage/LoadPage";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [modalName, setModalName] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [modalSpecies, setModalSpecies] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalGender, setModalGender] = useState("");
  const [modalOriginName, setModalOriginName] = useState("");
  const [modalLocationName, setModalLocationName] = useState("");
  const [statusCharacter, setStatusCharacter] = useState("");

  const calculatePageIndices = () => {
    const maxPageDisplay = 6;
    const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);

    let startPage = currentPage - halfMaxPageDisplay;
    let endPage = currentPage + halfMaxPageDisplay;

    if (startPage <= 0) {
      startPage = 1;
      endPage = maxPageDisplay;
    }

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = totalPage - maxPageDisplay + 1;
    }

    return { startPage, endPage };
  };

  const openModal = (result) => {
    setSelectedImageUrl(result.image_url);
    setModalName(result.name);
    setModalStatus(result.status);
    setModalSpecies(result.species);
    setModalType(result.type_null);
    setModalGender(result.gender);
    setModalOriginName(result.origin_name);
    setModalLocationName(result.location_name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async (_, page) => {
    setIsLoading(true);
    setSearchExecuted(true);

    try {
      const response = await fetch(
        "http://localhost:5000/search?query=" +
          encodeURIComponent(searchTerm) +
          "&page=" +
          encodeURIComponent(page || 1)
      );
      const data = await response.json();
      setSearchResults(data.results);
      console.log(data.results)
      setTotalPage(data.total_pages);
      setCurrentPage(page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  const getStatusCharacter = (status) => {
    return status === "Alive" ? "well" : "not so well";
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
          <button className="buttonFirstPage" onClick={handleSearch}>Search</button>
        </div>
        {searchExecuted && searchResults.length > 0 && (
          <div>
            <div className="results">
              {searchResults.map((result) => (
                <div
                  className={`card ${result.status === "Dead" ? "Dead" : ""}`}
                  key={result.id}
                  onClick={() => openModal(result)}
                >
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
            <a
                href="#"
                className="pgLimiter"
                onClick={(event) => {
                  event.preventDefault();
                  if (currentPage > 1) {
                    handleSearch(event, currentPage - 1);
                  }
                }}
              >
                {"<"} {/* VOLTA PARA PÁGINA ANTERIOR */}
              </a>
              {/* Renderizar botões de página com reticências */}
              {[...Array(totalPage).keys()].map((number) => {
                const { startPage, endPage } = calculatePageIndices();
                const className =
                  number + 1 === currentPage
                    ? "buttonFooter selected"
                    : "buttonFooter";
                if (
                  (number + 1 === startPage && startPage !== 1) ||
                  (number + 1 === endPage && endPage !== totalPage) ||
                  (number + 1 >= startPage && number + 1 <= endPage)
                ) {
                  return (
                    <button
                      className={className}
                      key={number + "pagination"}
                      onClick={(event) => {
                        handleSearch(event, number + 1);
                      }}
                    >
                      {number + 1}
                    </button>
                  );
                } else if (
                  number + 1 === startPage - 1 ||
                  number + 1 === endPage + 1
                ) {
                  // Adicionar reticências antes e depois do intervalo exibido
                  return <span key={number + "pagination"}>...</span>;
                }
                return null;
              })}
              <a
                href="#"
                className="pgLimiter"
                onClick={(event) => {
                  event.preventDefault();
                  if (currentPage < totalPage) {
                    handleSearch(event, currentPage + 1);
                  }
                }}
              >
                {">"}    {/*  VAI PARA PÁGINA POSTERIOR */}
              </a>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes do Personagem"
        className="modal"
        overlayClassName="ReactModal__Overlay"
      >
        <div className="modalImgContainer">
          <img
            className="modalImg2"
            src={selectedImageUrl}
            alt="Imagem em tela cheia"
          />
        </div>
          
        <div className="modalSetting">
          <img
            className="modalImg1"
            src={selectedImageUrl}
            alt="Imagem em tela cheia"
          />
          <p className="modalTextName">{modalName}</p>
          <p className="modalTextSpecies">{modalSpecies}</p>
        </div>
        <button className="modalButton" onClick={closeModal}>Close</button>
        <div className="textModalRight">
          <p>ABOUT</p>
          <p className="insideTextModalRight">
            {modalName} is a {modalGender} {modalSpecies}. He is {modalStatus}{" "}
            and {getStatusCharacter(modalStatus)}.{" "}
          </p>
          <p className="insideTextModalRightTitleNormal">ORIGIN</p>
          <p className="insideTextModalRightTitle">Planet</p>
          <p className="insideTextModalRight">{modalOriginName}</p>
          <p className="insideTextModalRightTitleNormal">LOCATION</p>
          <p className="insideTextModalRight">{modalLocationName}</p>
        </div>
      </Modal>
    </div>
  );
};

export default SearchComponent;

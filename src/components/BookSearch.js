import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../Loader.css";

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          setResults(data.docs);
          setTotalPages(Math.ceil(data.numFound / 10));
          setLoading(false);
        });
    } else {
      setResults([]);
      setTotalPages(1);
    }
  }, [query, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by book name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading</p>
        </div>
      ) : (
        <div className="results">
          {results.length > 0 ? (
            results.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                addToBookshelf={addToBookshelf}
              />
            ))
          ) : (
            <p>Search some books</p>
          )}
        </div>
      )}
      {results.length > 0 && !loading && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1 || loading}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages || loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;

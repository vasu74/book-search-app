import React, { useState, useEffect } from "react";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBooks(savedBooks);
  }, []);

  const removeBook = (key) => {
    const updatedBooks = books.filter((book) => book.key !== key);
    setBooks(updatedBooks);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const bookCoverUrl = (cover_i) =>
    cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : "placeholder_image_url";

  return (
    <div className="bookshelf">
      <h2>My Bookshelf</h2>
      <div className="bookshelf-row">
        {books
          .slice((page - 1) * booksPerPage, page * booksPerPage)
          .map((book) => (
            <div key={book.key} className="book-shelf-card">
              <img src={bookCoverUrl(book.cover_i)} alt={book.title} />
              <h3>{book.title}</h3>
              <button onClick={() => removeBook(book.key)}>Remove</button>
            </div>
          ))}
        {books.length === 0 && <p>Your bookshelf is empty. Add some books!</p>}
      </div>
      {books.length > booksPerPage && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;

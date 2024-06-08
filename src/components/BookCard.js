import React from "react";
import fallbackImage from "../pexels-koshevaya_k-2365312-4031547.jpg";

const BookCard = ({ book, addToBookshelf }) => {
  const bookCoverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : fallbackImage;

  return (
    <div className="book-card">
      <img src={bookCoverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Edition Count: {book.edition_count}</p>
      <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
    </div>
  );
};

export default BookCard;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import Bookshelf from "./components/Bookshelf";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem("bookshelf")) || []
  );

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<BookSearch addToBookshelf={addToBookshelf} />}
        />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
};

export default App;

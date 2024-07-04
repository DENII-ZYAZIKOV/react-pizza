import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import "./scss/app.scss";
import Cart from "./pages/Cart";
import { createContext, useState } from "react";
export const SearchContext = createContext("");
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/not-found" element={<Cart />}></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

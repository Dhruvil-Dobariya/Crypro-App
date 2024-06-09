import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";
import TopGainer from "./Pages/Top/TopGainer";
import TopLooser from "./Pages/Top/TopLooser";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/TopGainer" element={<TopGainer />} />
        <Route path="/TopLooser" element={<TopLooser />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;

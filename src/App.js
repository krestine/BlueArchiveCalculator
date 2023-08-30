import React, {useState} from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Stat from "./stat";
import Raid from "./raid";
import Footer from "./Footer";

function App() {
  const [Lan, setLan] = useState("Kor");
  const getData = (Lan) => {
    setLan(Lan);
  }
  return (
    <Router>
      <header>

		<Link to="/stat">
          <button className="block">스탯 계산기</button>
        </Link>
		<Link to="/raid">
          <button className="block">총력전 계산기</button>
        </Link>
		<br/>
		<div align="center">
		<Link to="/">
          <button>홈</button>
        </Link>
	    <Link to="/about">
          <button>사용법/정보</button>
        </Link>
		</div>
      </header>
      <hr />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
		  <Route path="/stat" element={<Stat/>} />
          <Route path="/about" element={<About/>} />
		  <Route path="/raid" element={<Raid/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

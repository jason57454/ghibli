import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Github_logo from "../src/assets/img/logo_github.png";

function App() {
  const [data, setData] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [opacity, setOpacity] = useState({ opacity: "0" });

  const handleClick = (index) => () => {
    setIsHidden((state) => ({
      [index]: !state[index],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const filmResp = await axios("https://ghibliapi.herokuapp.com/films");
      setData(filmResp.data);
    };

    fetchData();
  }, []);

  function setArrowOpacity() {
    if (window.scrollY > 1000) {
      setOpacity({ opacity: "1" });
    } else {
      setOpacity({ opacity: "0" });
    }
  }

  window.addEventListener("scroll", setArrowOpacity);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <nav>
        <div className="left_nav">
          <ul>
            <li>
              <a href="#showcase">Films</a>
            </li>
            <li>
              <a
                target="blank_"
                href="https://ghibliapi.herokuapp.com/#tag/Films%2Fpaths%2F~1films%2Fget"
              >
                Documentation
              </a>
            </li>
          </ul>
        </div>
        <div className="right_nav">
          <a href="https://github.com/jason57454" target="blank_">
            <img src={Github_logo} alt="logo"></img>
          </a>
        </div>
      </nav>
      <section id="home">
        <div className="container">
          <div className="title_home">
            <h2>The studio ghibli api</h2>
          </div>
        </div>
      </section>
      <section id="showcase">
        <div className="container_1">
          <div className="row_1">
            {data.map((item, index) => (
              <div className="card" key={item.id}>
                <div className="wrapper_card">
                  <div className="col_1">
                    <div className="banner">
                      <img src={item.image} alt="banner"></img>
                    </div>
                    <div className="col_2">
                      <div className="col_3">
                        <h2 className="title_movie">{item.title}</h2>
                        <h4 className="original_title">
                          {item.original_title}
                        </h4>
                      </div>
                      <div className="description">
                        <p>Description : </p>
                        <p
                          className={
                            isHidden[index] ? "text" : "text text_hidden"
                          }
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="row_3">
                        <p>Release date :</p>
                        <p>{item.release_date}</p>
                      </div>
                      <div className="col_4">
                        <div className="row_3">
                          <p>Director : </p>
                          <p className="director">{item.director}</p>
                        </div>
                        <div className="row_3">
                          <p>Producer : </p>
                          <p
                            className={
                              isHidden[index]
                                ? "producer"
                                : "producer producer_hidden"
                            }
                          >
                            {item.producer}
                          </p>
                        </div>
                        <div className="row_3">
                          <p>Running time : </p>
                          <p className="running_time">
                            {item.running_time} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="arrow_down" onClick={handleClick(index)}>
                  <span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="scroll_top" style={opacity} onClick={goToTop}>
          <span className="arrow_top"></span>
        </div>
      </section>
    </div>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="homeText">
        <h1>
        Learn the language, <br></br>
        discover the world <br></br>
        in the smartest way.</h1>
        <br />
        <div className="btns">
          <Link className="btn" to="/signup">Signup</Link>
          <Link className="btn" to="/login">Login</Link>
        </div>
      </div>
      <div className="homeImg">
        <img src="/main.png"></img>
      </div>
    </div>
  );
}

export default Home;

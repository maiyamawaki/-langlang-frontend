import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <div className="home area">
          <div className="homeText">
            <h1>
            Learn the language, <br></br>
            discover the world <br></br>
            with langlang<br></br>
            </h1>
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
      </div>
  );
}

export default Home;

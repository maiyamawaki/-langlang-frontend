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
          <Link className="signup btn" to="/signup">Signup</Link>
          <br></br>  
          <Link className="login btn" to="/login">Login</Link>
      </div>
        <img src="/main.png"></img>
    </div>
  );
}

export default Home;

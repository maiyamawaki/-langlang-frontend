import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import UserDetail from "./pages/UserDetail"
import Info from "./pages/Info"
import InfoDetail from "./pages/InfoDetail"
import NotFound from './components/404/NotFound.js';


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/profile/info" component={Info} />
      <Route exact path="/search/:userId" component={UserDetail} />
      <Route exact path="/profile/info/:infoId" component={InfoDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

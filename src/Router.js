import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Search from "./pages/Search"
import UserDetail from "./pages/UserDetail"
import DeleteConfirmPage from "./pages/DeleteConfirmPage"
import Msgs from "./pages/Msgs"
import Info from "./pages/Info"
import DeleteInfo from "./pages/DeleteInfo"
import Material from "./pages/Material"
import DeleteMaterial from "./pages/DeleteMaterial"
import Loading from "./pages/Loading"
import NotFound from './components/404/NotFound.js';


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/loading" component={Loading} />
      <Route exact path="/profile/editProfile" component={EditProfile} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/profile/msgs" component={Msgs} />
      <Route exact path="/msgs/:msgId" component={DeleteConfirmPage} />
      <Route exact path="/profile/info" component={Info} />
      <Route exact path="/info/:infoId" component={DeleteInfo} />
      <Route exact path="/profile/material" component={Material} />
      <Route exact path="/material/:materialId" component={DeleteMaterial} />
      <Route exact path="/search/:userId" component={UserDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

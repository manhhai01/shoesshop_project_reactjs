import React from "react";
import {
  // BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";

// custom history
import { createBrowserHistory } from "history";

// content
import HomeTemplate from "./templates/HomeTemplate";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Carts from "./pages/Carts";

export const customNavigate = createBrowserHistory();

const App = () => {
  return (
    <HistoryRouter history={customNavigate}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Index />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="cart" element={<Carts />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="*" element={<Index />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;

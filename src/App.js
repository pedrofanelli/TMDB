import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Single from "./components/Single";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import { message } from "antd";
import { setUser } from "./store/user";
import OtherUsers from "./components/OtherUsers";
import Error404 from "./components/Error404";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const localString = localStorage.getItem("user")
    if (localString) {
      const localObj = JSON.parse(localString);
      dispatch(setUser(localObj));
      message.success(`Welcome back ${localObj.name}`);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<Single />} />
        <Route path="/tv/:id" element={<Single />} />
        <Route path="/users" element={<OtherUsers />} />
        <Route path="/otherprofile" element={<Profile />} />
        <Route path="/404" element={<Error404/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </>
  );
}

export default App;

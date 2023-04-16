import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/user";
import { message } from "antd";

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [regisValues, setRegis] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const regisData = (e) => {
    const { name, value } = e.target;
    setRegis({ ...regisValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/create", regisValues);
      if (user.data) {
        dispatch(setUser(user.data));
        message.success(`Success login: welcome ${user.data.name}`);
        localStorage.setItem("user", JSON.stringify(user.data));
        navigate('/main');
      };
    } catch (err) {
      if (err.response.data === "Validation error") {
        message.error(`Validation error`);
      } else if (err.response.data === "unique violation") {
        message.error(`Already exists an account with that email!`);
      } else {
        message.error(`Something went wrong :(`);
      }
      console.error(err);
    }
  };

  return (
    <div id="fixNavWidth">
      <h1 className="text-center mt-4">The Movie Database</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center" style={{ width: "35%", margin: "auto", marginTop:"3em" }}>
        <label htmlFor="name" className="form-label">NAME </label>
        <input
        className="form-control m-2"
          id="name"
          name="name"
          type="text"
          onChange={(e) => regisData(e)}
        ></input>
        <label htmlFor="lastname" className="form-label">LASTNAME </label>
        <input
        className="form-control m-2"
          id="lastname"
          name="lastname"
          type="text"
          onChange={(e) => regisData(e)}
        ></input>
        <label htmlFor="email" className="form-label">EMAIL </label>
        <input
        className="form-control m-2"
          id="email"
          name="email"
          type="email"
          onChange={(e) => regisData(e)}
        ></input>
        <label htmlFor="password" className="form-label">PASSWORD </label>
        <input
        className="form-control m-2"
          id="password"
          name="password"
          type="password"
          onChange={(e) => regisData(e)}
        ></input>
        <button type="submit" className="btn btn-outline-success me-2 m-2">CREATE USER</button>
      </form>
    </div>
  );
};

export default CreateUser;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
  });

  const loginData = (e) => {
    const { name, value } = e.target;
    setLogin({ ...loginValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await axios.post("/api/login", loginValues);
      
      const resultado = payload.data.favorites.map(async (fav, i) => {
        const arr = fav.split("$");
        try {
           return await axios.get(`https://api.themoviedb.org/3/${arr[1]}/${arr[0]}?api_key=${process.env.REACT_APP_API_KEY}`);
        } catch (error) {
          console.error(error);
        }
      })
      
      const losFavs = await Promise.all(resultado);
      losFavs.forEach((item, i, arr) => {arr[i] = item.data})
      payload.data.favorites = losFavs;

      dispatch(setUser(payload.data));
      message.success(`Success login: welcome back ${payload.data.name}`);
      localStorage.setItem("user", JSON.stringify(payload.data));
      navigate('/main');
      
    } catch (err) {
      console.error(err);
      message.error(`Please try again with correct credentials`);
      e.target[0].value = "";
      e.target[1].value = "";
      setLogin({email: "", password: ""});
    }
  };

  return (
    <div id="fixNavWidth">
      <h1 className="text-center mt-4">The Movie Database</h1>
      <form onSubmit={handleSubmit} className="text-center" style={{ width: "35%", margin: "auto", marginTop:"4em" }}>
        <label htmlFor="email" className="form-label">EMAIL </label>
        <input
        className="form-control m-2"
          id="email"
          name="email"
          type="email"
          onChange={(e) => loginData(e)}
        ></input>
        <label htmlFor="password" className="form-label">PASSWORD </label>
        <input
        className="form-control m-2"
          id="password"
          name="password"
          type="password"
          onChange={(e) => loginData(e)}
        ></input>
        <button type="submit" className="btn btn-outline-success me-2 m-2">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;

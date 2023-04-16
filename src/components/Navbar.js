import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { resetUser } from "../store/user";
import { resetSearch } from "../store/search";
import { resetOther } from "../store/otherUser";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      message.success(`User logged out successfully`);
      dispatch(resetUser());
      dispatch(resetSearch());
      dispatch(resetOther());
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error(`Something went bad :(`);
    }
  };

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{
        backgroundColor: "#f4d35e",
        borderBottomStyle: "solid",
        borderColor: "#264653",
        zIndex: "1",
        opacity: "0.85"
      }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <Link to={userRedux.name ? "/main" : "/"} id="logo">
            <h2>The Movie DB</h2>
          </Link>

          {userRedux.name ? (
            <>
              <Link to={"/profile"} className="ms-5" id="profile">
                <h2>My profile</h2>
              </Link>
              <Link to={"/users"} className="ms-5" id="profile">
                <h2>Other users</h2>
              </Link>
            </>
          ) : (
            false
          )}
        </div>

        {userRedux.name ? (
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="me-4" style={{color: "#264653"}}>{`${userRedux.name} ${userRedux.lastname}`}</h5>
            <button
              className="btn btn-outline-danger me-2"
              type="button"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div>
            <Link to={"/login"}>
              <button className="btn btn-outline-success me-2" type="button">
                LOGIN
              </button>
            </Link>

            <Link to={"/create"}>
              <button className="btn btn-outline-primary me-2" type="button">
                REGISTER
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

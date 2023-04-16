import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addFavourite, deleteFavourite } from "../store/user";
import { Link, useLocation } from "react-router-dom";

const Card = ({ item }) => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const forImg = "https://image.tmdb.org/t/p/w300";

  const handleClick = async () => {
    if (!user.name) {
      message.error(`To add a favorite you need to be logged in`);
      return;
    }

    try {
      const objetito = {
        email: user.email,
        itemId: item.id,
        itemTitle: item.title || item.name,
        itemRelease: item.release_date || "serie",
      };
      await axios.put(`/api/favorites`, objetito);
      dispatch(addFavourite(item));
    } catch (err) {
      console.error(err);
      message.error(`Something went wrong :(`);
    }
  };

  const handleDelete = async () => {
    if (!user.name) {
      message.error(`To add a favorite you need to be logged in`);
      return;
    }
    try {
      await axios.delete(`/api/${user.email}/favorites/${item.id}`);
      dispatch(deleteFavourite(item));
    } catch (err) {
      console.error(err);
      message.error(`Something went wrong :(`);
    }
  };

  return (
    <div className="card m-2" style={{ width: "18em", zIndex: "0" }} id="card">
      <img
        src={forImg + item.poster_path}
        className="card-img-top"
        alt={"ITEM POSTER"}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title ? item.title : item.name}</h5>
        <p className="card-text">RATING: {item.vote_average}</p>

        <Link to={`/${item.title ? "movie" : "tv"}/${item.id}`} state={{ path: location.pathname }}>
          <button type="button" className="btn btn-primary">
            Description
          </button>
        </Link>
        {
          location.pathname !== "/otherprofile"
          ? (
            location.pathname === "/main" ? (
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-outline-warning me-2"
                type="button"
                onClick={handleClick}
              >
                FAV
              </button>
            ) : (
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-outline-danger me-2"
                type="button"
                onClick={handleDelete}
              >
                DELETE
              </button>
            )
          )
          : false
        }
        
      </div>
    </div>
  );
};

export default Card;

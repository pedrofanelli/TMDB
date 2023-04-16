import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Single = () => {
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  const other = useSelector((state) => state.other);
  const { id } = useParams();
  let item = user.favorites.filter((fav) => fav.id === Number(id))[0];
  if (location.state.path === "/main") {
    search.forEach((unit) => {
      if (unit.id === Number(id)) {
        item = unit;
      }
    });
  } else if (location.state.path === "/otherprofile") {
    other.favorites.forEach((unit) => {
      if (unit.id === Number(id)) {
        item = unit;
      }
    });
  }

  const forImg = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="text-center" id="fixNavWidth">
      <h2>{item.title ? item.title : item.name}</h2>
      <h4>
        Release Date:{" "}
        {item.release_date ? item.release_date : item.first_air_date}
      </h4>
      <h5>
        Popularity: {item.popularity} ---- Rating: {item.vote_average}
      </h5>
      <div className="d-flex justify-content-center m-4">
        <img src={forImg + item.poster_path} alt={"ITEM POSTER"}></img>
        <h5>{item.overview}</h5>
      </div>
    </div>
  );
};

export default Single;

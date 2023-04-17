import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../commons/Card";
import { someSearch } from "../store/search";

const MainPage = () => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.search);
  const [dataSearch, setDataSearch] = useState({
    api_key: process.env.REACT_APP_API_KEY,
    query: "",
    language: "en-US",
    page: "1",
    include_adult: "false",
    region: "",
    year: "",
  });

  const searchData = (e) => {
    const { name, value } = e.target;

    const modified = value.replace(/ /g, "%20");
    setDataSearch({ ...dataSearch, [name]: modified });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let subpath = "movie";
    try {
      if (filter.film && filter.serie) subpath = "multi";
      else if (filter.serie) subpath = "tv";
      const apiRes = await axios.get(
        `https://api.themoviedb.org/3/search/${subpath}?api_key=${dataSearch.api_key}&query=${dataSearch.query}`
      );
      console.log("PATH", subpath);
      dispatch(someSearch(apiRes.data.results));
    } catch (err) {
      console.error(err);
    }
  };

  const [filter, setFilter] = useState({
    film: false,
    serie: false,
  });

  const handleFilter = (e) => {
    const { name, checked } = e.target;
    setFilter({ ...filter, [name]: checked });
  };

  return (
    <div id="fixNavWidth">
      <h1 className="text-center mt-4">Search the Movie or TV show you desire</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-check form-switch d-flex justify-content-center mt-4">
          <input
            className="form-check-input"
            role={"switch"}
            type="checkbox"
            id="film"
            name="film"
            onChange={(e) => handleFilter(e)}
          />
          <label
            className="form-check-label"
            htmlFor="film"
            style={{ marginLeft: "10px" }}
          >
            {" "}
            MOVIES{" "}
          </label>
        </div>
        <div className="form-check form-switch d-flex justify-content-center mb-0">
          <input
            className="form-check-input"
            role={"switch"}
            type="checkbox"
            id="serie"
            name="serie"
            onChange={(e) => handleFilter(e)}
          />
          <label
            className="form-check-label"
            htmlFor="serie"
            style={{ marginLeft: "10px" }}
          >
            TV SHOWS
          </label>
        </div>
        <br />
        <div
          className="d-flex justify-content-center"
          style={{ width: "50%", margin: "auto", marginBottom: "25px" }}
        >
          <input
            className="form-control"
            id="query"
            name="query"
            type="text"
            onChange={(e) => searchData(e)}
          ></input>
          <button type="submit" className="btn btn-outline-primary mx-2" >
            SEARCH
          </button>
        </div>
      </form>
      <div className="card-group d-flex justify-content-evenly text-center">
        {searchList.length
          ? searchList.map((item) => (
              <div key={item.id}>
                <Card item={item} />
              </div>
            ))
          : false}
      </div>
    </div>
  );
};

export default MainPage;

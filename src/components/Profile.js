import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../commons/Card";

const Profile = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const other = useSelector((state) => state.other);

  return (
    <div className="text-center" id="fixNavWidth">
      {
        location.pathname === "/otherprofile"
        ? <h1 className="mt-4">{other.fullname} Favorites</h1>
        : <h1 className="mt-4">Profile Favorites</h1>
      }

      <div className="card-group d-flex justify-content-evenly text-center">
        {location.pathname === "/profile"
          ? user.favorites.length
            ? user.favorites.map((item) => (
                <div key={item.id}>
                  <Card item={item} />
                </div>
              ))
            : false
          : other.favorites.length
          ? other.favorites.map((item) => (
              <div key={item.id}>
                <Card item={item} />
              </div>
            ))
          : false}
      </div>
    </div>
  );
};

export default Profile;

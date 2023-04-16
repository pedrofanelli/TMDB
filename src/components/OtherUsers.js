import axios from 'axios';
import React, { useState } from 'react'
import User from '../commons/User';

const OtherUsers = () => {
    const [data, setData] = useState("");
    const [users, setUsers] = useState([]);

    const searchData = (e) => {
        const { value } = e.target;
        setData(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usersDB = await axios.get(`/api/users/${data}`)
            // podría agarrarlos, setear un estado local, y en función de eso armo un map con el componente
            if (typeof usersDB.data === "string") return;
            setUsers(usersDB.data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div id='fixNavWidth'>
    <h1 className="text-center mt-4">Search other users</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
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
      <div>
        {users.length
          ? users.map((user) => (
              <div key={user.id} className="m-4">
                <User user={user} />
              </div>
            ))
          : false}
      </div>
    </div>
  )
}

export default OtherUsers
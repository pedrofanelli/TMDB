import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setOtherUserF, setOtherUserInfo } from '../store/otherUser';

const User = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = async () => {

        const resultado = user.favorites.map(async (fav) => {
            const arr = fav.split("$");
            try {
               return await axios.get(`https://api.themoviedb.org/3/${arr[1]}/${arr[0]}?api_key=${process.env.REACT_APP_API_KEY}`);
            } catch (error) {
              console.error(error);
            }
          });

        const losFavs = await Promise.all(resultado);
        losFavs.forEach((item, i, arr) => {arr[i] = item.data})
          console.log(losFavs);
          dispatch(setOtherUserF(losFavs))
          dispatch(setOtherUserInfo(user.fullname))
        navigate("/otherprofile")
    }

  return (
    <div className='d-flex justify-content-center text-center'>
        <h3>{user.fullname} ({user.email})</h3>
        <button onClick={handleClick} className="btn btn-outline-success ms-4" type="button">More info</button>
    </div>
  )
}

export default User
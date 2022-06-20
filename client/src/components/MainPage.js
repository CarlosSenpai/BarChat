import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import profileImage from '../images/profile.png';
import infoLogo from '../images/information.png';
import messageImage from '../images/message.png';
import discoverImage from '../images/location.png';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../App.css';

const MainPage = (props) => {
  
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect( () => {
    const userToken = Cookies.get('userToken');
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    axios.post(`http://localhost:8000/api/users/logout`, {}, {withCredentials: true})
      .then( (res) => {
        Cookies.remove('userToken');
        setUser('null')
        navigate('/')
      })
      .catch(err=>console.log('Logout Error', err));
  }

  return (
    <>
    <NavBar />

    {user ? <div>
      <p>Welcome back {user.name} </p>
    </div>
    : <div>
      <p>No one is here</p>
    </div>}

    <div className='div' >
    <Link to={`/profile/${user._id}`}>
      <img src={profileImage} alt="profile pic" className="image" />
    </Link>
    <label >Profile</label>
    </div>

    <div className='div'>
    <a href="/app/info">
      <img src={infoLogo} alt="info logo pic" className="image" />
    </a>
    <label>Information</label>
    </div>

    <div className='div'>
    <Link to={`/barchat/${user._id}`}>
      <img src={messageImage} alt="message pic" className="image" />
    </Link>
    <label>Chat </label>
    </div>

    <div className='div'>
      <Link to={`/discover/${user._id}`}>
        <img src={discoverImage} alt="discover pic" className="image" />
      </Link>
    </div>
    
    </>
  )
}

export default MainPage;
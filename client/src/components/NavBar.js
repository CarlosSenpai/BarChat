import React, {useState} from 'react'
import "../Nav.css";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';



const NavBar = () => {

    const [user, setUser] = useState("");

    const navigate = useNavigate();


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

    <nav class="navbar navbar-expand-lg" id="Bar">
        <a class="navbar-brand" href="#">BarChat</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
            <a class="nav-link" href="/home">Home </a>
                </li>
        <li class="nav-item">
            <p class="nav-link" onClick={handleLogout}>Logout</p>
        </li>
        </ul>
    </div>
</nav>


    </>
    )
}

export default NavBar
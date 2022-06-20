import React from 'react'
import {Link} from 'react-router-dom';
import NavBar from './NavBar';

const InfoPage = () => {

    return (
        <>

        <NavBar/>
        
        <h2>BarChat Info</h2>

        <p>Thank you for registering to the BarChat App!</p>
        <p>Please be aware that this is a prototype of a student looking to become a full stack developer. Its only purpose is to demonstrate the skills he has learned throughout his time at the Coding Dojo Bootcamp.</p>
        <p>We hope you enjoy the experience that this novice app offers and that - like us - you look forwards to the deployment of BarChat as a fully developed application!</p>
        <p>Cheers!!</p>
        <Link to={'/home'}>
            <p>Home</p>
        </Link>

        //Image source: <a href="https://www.flaticon.com/free-icons/info" title="info icons">Info icons created by th studio - Flaticon</a>
        <br></br>
        //Scss source:<a href="https://codepen.io/Jackthomsonn/pen/jWyGvX" title="scss source">SCSS Source</a>
        </>

    )

}

export default InfoPage
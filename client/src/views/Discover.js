import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { isPointWithinRadius } from 'geolib';
import useGeoLocation from '../components/useGeoLocation';
import NavBar from '../components/NavBar';



const Discover = () => {

    
    const location = useGeoLocation();

    const { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [image, setImage] = useState("");

    const [radar, setRadar] = useState(false);

    useEffect( () => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then( res => {
                setFirstName(res.data.firstName);
                setImage(res.data.image);
            })
            .catch( (err) => console.log(err))
    }, [])

    isPointWithinRadius(
            { lat: 51.525, lng: 7.4575 },
            { lat: 51.5175, lng: 7.4678 },
            5000
        )

function check() {
if (isPointWithinRadius() === true) {
    console.log("Hey");
} else {
    console.log("No Hey");
}}

    return (
        <>
        <NavBar/>
        <p>Discover users near you!</p>
        { 
        location.loaded ? JSON.stringify(location) : "Location data not available yet"
        }

        <button onClick={check}>Near me?</button>

    </>
    )

}

export default Discover;
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import useGeoLocation from '../components/useGeoLocation';
import NavBar from '../components/NavBar';



const Discover = () => {

    const geolib = require('geolib');

    
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

    // useEffect( () => {
    //     axios.post(`http://localhost:8000/api/user/location`)
    //         .then( res => {})
    // })

    const shareLocation = (event) => {
        axios.post(`http://localhost:8000/api/user/location`)
        .then((res) => {
            console.log(res, "res");
            console.log(res.data, "is res data!");
        })
        .catch( (err) => {
            console.log(err.response.data);
        });
    };

    function check() {
    if (geolib.isPointWithinRadius({ latitude: location.coordinates.lat, longitude: location.coordinates.lng },
        { latitude: 51.5175, longitude: 7.4678 },
        5000) === true) {
        console.log("Hey");
    } else {
        console.log("No Hey");
    }
    
}

    return (
        <>
        <NavBar/>
        <p>Discover users near you!</p>
        { 
        location.loaded ? JSON.stringify(location) : "Location data not available yet"
        }
        <br/>
        <button onClick={check}>Near me?</button>

        <button onClick={shareLocation}>Save Location</button>

    </>
    )

}

export default Discover;
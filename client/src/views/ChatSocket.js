import React, {useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import io from "socket.io-client"
import Chat from '../components/Chat';
import Socket from '../components/Socket';
import NavBar from '../components/NavBar';
import '../App.css';


const socket = io.connect("http://localhost:3001");

const ChatSocket = () => {

    const { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");

    const [room, setRoom] = useState("");

    const [showChat, setShowChat] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then( res => {
                setFirstName(res.data.firstName);
                setGender(res.data.gender);
                setImage(res.data.image);
            })
            .catch( (err) => console.log(err))
            
        }, [])

    const joinRoom = () => {
        if ( firstName !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }

    const leaveRoom = () => {
        if ( room !== "") {
            setRoom("");
            navigate(`/home`)
        }
    }
    

    return(
        <>

        <NavBar/>
        {!showChat ? (
            null
        ): <button onClick={leaveRoom} className="transparent">Leave Room</button>}
        <br/>
        {!showChat ? (
            <Socket 
            joinRoom = {joinRoom} 
            image = {image}
            firstName = {firstName}
            setFirstName = {setFirstName}
            setRoom = {setRoom}
            room = {room}
            />
        )
            :
        (
            <Chat
            socket = {socket}
            room = {room}
            firstName = {firstName}
            leaveRoom = {leaveRoom}
            />
        )}
        </>
    )
}

export default ChatSocket;
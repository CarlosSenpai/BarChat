import React from 'react';
import '../App.css';

const Socket = (props) => {

    return(

    <>
    
    <div>
        <img src={props.image} className="image" alt="Profile Pic"/>
        <p>Welcome {props.firstName}</p>
    </div>

        <div class="input-group mb-3" id="roomBar">
            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="butto n-addon1" placeholder="Room ID" onChange={(event) => {props.setRoom(event.target.value)}} id="inputBlock" />
            <button class="btn btn-outline-secondary" type="button" id="button-addon1"  onClick={props.joinRoom}>Join Bar</button>
        </div>

    
    </>
    )
}

export default Socket;
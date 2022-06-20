import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const {userId, setUserId} = props;

    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",{email: email, password: password}, {withCredentials: true}
        )
        .then((res) => {
            console.log(res, "res");
            console.log(res.data, "is res data!");
            navigate("/home")
        })
        .catch( (err) => {
            console.log(err.response.data);
            setErrorMessage(err.response.data.message);
        });
    };

    return(
    <>
        <h3>Login</h3>
        <p>{errorMessage ? errorMessage : "" }</p>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={login}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

    <button type="submit" class="btn btn-primary">Sign In</button>
</form>
    </>
    )
}

export default Login;


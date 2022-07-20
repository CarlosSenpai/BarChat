import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUser ({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/users/register`, user,{
            withCredentials: true
        })
        .then( (res) => {
            console.log(res.data);
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
                password: "",
                confirmPassword: "",
            })
            setConfirmReg("Thank you for Registering, you can now log in");
        })
        .catch((err) => {
            console.log(err.response.data);
            console.log("_-----------------_")
            setErrors(err.response.data.errors);
        })
    }

    return(
    <>
    <h3>Register</h3>
    {confirmReg ? <h4>{confirmReg}</h4> : null}

        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={register}>

        <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="firstName" value={user.firstName}  onChange={(e) => handleChange(e)}/>
            {errors.firstName ? (
                <span className='error-text'>
                    {errors.firstName.message}
                </span>
            ): null}
        </div>

        <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="lastName" value={user.lastName}  onChange={(e) => handleChange(e)}/>
            {errors.lastName ? (
                <span className='error-text'>
                    {errors.lastName.message}
                </span>
            ): null}
        </div>

        <div class="mb-3">
            <label class="form-label">Gender</label>
            <select class="form-select" aria-label="Default select example" value={user.gender} name="gender" onChange={(e) => handleChange(e)}>
                <option >---</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Agender">Agender</option>
                <option value="Cisgender">Cisgender</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Genderqueer">Genderqueer</option>
                <option value="Intersex">Intersex</option>
                <option value="Gender Nonconforming">Gender Nonconforming</option>
                <option value="Transgender">Transgender</option>
            </select>
            {errors.gender ? (
            <span className='error-text'>
            {errors.gender.message}
            </span>
            ): null}
        </div>

        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={(e) => handleChange(e)}/>
            {errors.email ? (
                <span className='error-text'>
                    {errors.email.message}
                </span>
            ): null}
        </div>

    <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"  name="password" value={user.password} onChange={(e) => handleChange(e)} />
    {errors.password ? (
                <span className='error-text'>
                    {errors.password.message}
                </span>
    ): null}
    </div>

    <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"  name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)} />
    {errors.confirmPassword ? (
                <span className='error-text'>
                    {errors.confirmPassword.message}
                </span>
    ): null}
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </>

    )
}

export default Register;
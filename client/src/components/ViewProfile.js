import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import user from '../images/user.png';
import NavBar from './NavBar';


const ViewProfile = () => {

    const { id } = useParams();

    const [firstName, setFirstName] = useState("");

    const [gender, setGender] = useState("");

    const [image, setImage] = useState("");

    const [errors, setErrors] = useState({});

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

    const updateProfile = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${id}`, {firstName, image})
            .then( (res) => {
                console.log(res.data);
                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    navigate(`/home`);
                }
            })
    }

    return (
        <>

        <NavBar/>
        
        <form onSubmit={updateProfile}  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >

        <div class="mb-3">
            {
                image ? (<img src={image} alt="profile pic" style={{width: '200px'}} />): <img src={user} style={{width: '200px'}} alt="backup image" />
            }
            <label  style={{display: 'block'}}class="form-label">Profile Pic</label>
            <input type="text" class="form-control"  value={image} onChange={(e) => setImage(e.target.value)} />

            {errors.firstName ? <p>{errors.name.message}</p> : null}
        </div>
        
        
        <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1"  name="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>

            {errors.firstName ? <p>{errors.name.message}</p> : null}
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Gender</label>
            <select class="form-select" aria-label="Default select example" value={gender} onChange={(e) => {setGender(e.target.value)}} name="gender">
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
        </div>

        <button type="submit" class="btn btn-primary">Update</button>

        </form>
        
        </>
    )
}

export default ViewProfile;
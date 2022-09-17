import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { registerUser } from '../userSlice';
import './Signup.css'

const Signup = props => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [signup, setSignup] = useState({
        nick: '',
        password: ''
    });

    const handleInput = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    };

    const userSignup = (e) => {
        e.preventDefault();

        setSignup({
            ...signup
        })

        dispatch(registerUser(signup.nick, signup.password))

        alert('Te has registrado correctamente');

            navigate('/')
     
    }

    return (
        <div className="signupWall">

                <label className="labelitems">Nick</label>
                <input onChange={handleInput} className="inputitem" type="text" name="nick" />

                <label className="labelitems">Password</label>
                <input onChange={handleInput} className="inputitem" type="password" name="password" />

                <button onClick={userSignup} className=" submitSignupItem" type="submit">Sign Up</button>

        </div>
    )

}

export default Signup
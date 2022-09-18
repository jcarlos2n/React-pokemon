import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { registerUser } from '../userSlice';
import '../Login/Login.css'

const Signup = props => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [signup, setSignup] = useState({
        nick: '',
        password: ''
    });

    const [msg, setMsg] = useState({
        txt: ''
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

        if ((signup.nick).length < 6) {
            setMsg({
                txt: 'El nick es demasiado corto, tiene que ser mayor de 6 caracteres'
            })

        } else {
            dispatch(registerUser(signup.nick, signup.password))

            setMsg({
                txt: 'Te has registrado correctamente'
            })
            setTimeout(() => {
                navigate('/')
                setMsg({
                    txt: ''
                })
            }, 2000);

        }



    }

    return (
        <div className='loginWall'>
            <div className="backGround">

                <label className="labelLogin">Nick</label>
                <input onChange={handleInput} className="inputLogin" type="text" name="nick" />

                <label className="labelLogin">Password</label>
                <input onChange={handleInput} className="inputLogin" type="password" name="password" />

                <button onClick={userSignup} className="submitLogin" type="submit">Sign Up</button>

                <div className="errorMessage">
                    {msg.txt}
                </div>
            </div>
        </div>
    )

}

export default Signup
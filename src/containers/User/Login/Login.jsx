import React, { useEffect, useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, userData } from "../userSlice";
// import { loginUser, userData } from "../userSlice";

const Login = props => {
     const [credentials, setCredentials] =useState({nick: '', password: ''});
     const [msgError, setMsgError] = useState("");

     let navigate = useNavigate();
     const dispatch = useDispatch();
     const loginData = useSelector(userData);

     const updateCredentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
     }

     useEffect(() => {
        if (loginData?.token !== '') {
            navigate('/login')
        }
     },[]);

     const login = (e) => {
        e.preventDefault()
        
        if (credentials.password.length < 6) {
            setMsgError('La contraseña debe tener mas de 6 caracteres');
            return;
        }
        setMsgError('');
        dispatch(loginUser({
            nick: credentials.nick,
            password: credentials.password
        }));
        

        setTimeout(() => {
            navigate('/')
            
        },1000)
        
     };


    return (
        <div className="loginWall">
            <label className="labelLogin">Nick</label>
            <input className="inputLogin" type="text" name="nick" onChange={updateCredentials}/>

            <label className="labelLogin">Password</label>
            <input className="inputLogin" type="password" name="password" onChange={updateCredentials}/>

            <input className="submitLogin" type="submit" value="Log in" onClick={login}/>

            <div className="errorMessage">
                {msgError}
            </div>
        </div>
    )

}

export default Login
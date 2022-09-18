import '../Login/Login.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../userSlice";
import { useEffect, useState } from 'react';

const Update = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(userData);

    const [update, setUpdate] = useState({
        nick: ''
    });

    useEffect(() => {
        if (!userInfo?.user) {
            navigate('/');
        }
    })

    const getOut = () => {
        dispatch(logout());
        navigate("/")
    }

    const handleInput = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }
    
    const userUpdate = (e) => async(req,res) => {
       
        const config = {
            headers: { "Authorization": `Bearer ${userInfo.token}` }
        }
        await axios.put(`http://localhost:3001/users/update/${userInfo.user._id}`,{
            nick: update.nick
        },config).then(res =>{
            console.log('Update realizado')
            setTimeout(() => {
                getOut(),
                navigate('/')
            }, 1000);
        }).catch(err => {
            console.log('no entro')
            console.log(err)
        })
    }

    return(
        <div className="loginWall">
            <label className="labelLogin">Nick</label>
            <input onChange={handleInput} className="inputLogin" type="text" name="nick" />

            {/* <label className="labelLogin">Password</label>
            <input className="inputLogin" type="password" name="password" onChange={updateCredentials}/> */}

            <button onClick={userUpdate()}>Update</button>

            <div className="errorMessage">
                {/* {msgError} */}
            </div>
        </div>
    )
}

export default Update

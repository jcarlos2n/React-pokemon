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
    const [msg, setMsg] = useState({
        txt: ''
    })

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

    const userUpdate = (e) => async (req, res) => {
        if ((update.nick).length < 6) {
            setMsg({
                txt: 'El nick es demasiado corto, tiene que ser mayor de 6 caracteres'
            })
            setTimeout(() => {
                setMsg({
                    txt: ''
                })
            }, 2000);
        } else {
            const config = {
                headers: { "Authorization": `Bearer ${userInfo.token}` }
            }
            await axios.put(`http://localhost:3001/users/update/${userInfo.user._id}`, {
                nick: update.nick
            }, config).then(res => {
                setMsg({
                    txt: 'Usuario actualizado correctamente, vuelva a iniciar sesión'
                })
                setTimeout(() => {
                    getOut(),
                        navigate('/')
                }, 2000);
            }).catch(err => {
                console.log(err)
            })
        }

    }

    return (
        <div className="loginWall">

            <label className="labelLogin">Nick</label>
            <input onChange={handleInput} className="inputLogin" type="text" name="nick" />

            <button onClick={userUpdate()} className='submitLogin'>Update</button>

            <div className="errorMessage">
                {msg.txt}
            </div>
        </div>
    )
}

export default Update

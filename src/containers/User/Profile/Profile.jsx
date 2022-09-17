import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { logout, userData } from '../userSlice';
import './Profile.css'

const Profile = props => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dataUser = useSelector(userData);

    const getOut = () => {
        dispatch(logout());
        navigate("/")
    }

    useEffect(() => {
       
        if (!dataUser?.user) {
            navigate('/');
        }

    })
    
    return(
        <div>
            <button onClick={getOut}> Log out</button>
        </div>
    )
}

export default Profile
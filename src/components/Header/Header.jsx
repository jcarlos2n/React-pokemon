import "./Header.css";
import { NavLink } from 'react-router-dom'
import React from "react"
import { useSelector } from "react-redux";
import { userData } from "../../containers/User/userSlice";


const Header = () => {
    const dataUser = useSelector(userData);

    if (!dataUser?.token) {
        return (
            <div className="container">
                <NavLink to='/' className='links'>Home</NavLink>
                <NavLink to='/login' className='links'>Log In</NavLink>
                <NavLink to='/signup' className='links'>Sign Up</NavLink>

            </div>
        )
    } else {
        return (
            <div className="container">
                <NavLink to='/' className='links'>Home</NavLink>
                <NavLink to='/pokemon' className='links'>Pokemon</NavLink>
                <NavLink to='/profile' className='links'>{dataUser.user.nick}</NavLink>
            </div>
        )
    }

}

export default Header
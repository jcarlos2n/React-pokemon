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
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
                
            </div>
        )
    }else{
        return (
            <div className="container">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/pokemon'>Pokemon</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                {/* <NavLink></NavLink> */}
            </div>
        )
    }
    
}

export default Header
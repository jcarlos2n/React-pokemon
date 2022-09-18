import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { logout, userData } from '../userSlice';
import axios from 'axios';
import './Profile.css'
import PokeCard from '../../../components/PokeCard/PokeCard';

const Profile = props => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const dataUser = useSelector(userData);
    const [user, setUser] = useState([]);
    const getOut = () => {
        dispatch(logout());
        navigate("/")
    }

    

    useEffect(() => {
       
        if (!dataUser?.user) {
            navigate('/');
        }else {
            async function fetchUser(){
            try {
                
                await axios.get(`http://localhost:3001/users/get/${dataUser.user._id}`)
                .then(resp => {
                    setUser(resp.data.pokemons);  
                })
            } catch (err) {
                console.error(err)
            }
           
        }
            fetchUser()
        }

    },[])
    
    const PokemonList =  () => {
            if (user.length > 0) {
                
                return (
                    <div className="listContainer">
                        <div>
                            <br></br>
                            <h3>Has logrado capturar {user.length} pokemons, {dataUser.user.nick}</h3>
                            <br></br>
                        </div>
                        <div className="list">
                            {
                                user.map((poke, index) => (
                                    <PokeCard key={index} data={poke} />
                                ))
                            }
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="elemTitle">
                        <br></br>
                        <h3>No Users Registered. We are broke!</h3>
                        <br></br>
                    </div>
                )
            }
    }

    return(
        
        <div className='profileWall'>
            <PokemonList/>
            <button onClick={getOut}> Log out</button>
        </div>
    )
}

export default Profile
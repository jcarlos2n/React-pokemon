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
        } else {
            async function fetchUser() {
                try {
                    const config = {
                        headers: { "Authorization": `Bearer ${dataUser.token}` }
                    }

                    await axios.get(`http://localhost:3001/users/get/${dataUser.user._id}`)
                        .then(resp => {
                            setUser(resp.data.pokemons);
                        })
                } catch (err) {
                    console.error(err)
                }

            }
            fetchUser()

            async function deleteUser() {
            }
        }

    }, [])

    const PokemonList = () => {
        if (user.length > 0) {
          
            return (
                <div className="listContainer">
                    <div>
                        <br></br>
                        <h2 className='titleCont'>Has logrado capturar {user.length} pokemons, {dataUser.user.nick}</h2>
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
                    <h3 className='titleCont'>No has capturado ningún pokemon, clica en Pokemon para ir a capturarlos!</h3>
                </div>
            )
        }
    }

    let deleteUser = async () => {
        try {
            const config = {
                headers: { "Authorization": `Bearer ${dataUser.token}` }
            }
            await axios.delete(`http://localhost:3001/users/delete/${dataUser.user._id}`, config)
                .then(resp => {
                    console.log('Usuario eliminado');
                    getOut()
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }).catch(err => {
                    console.error(err);
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='profileWall'>
            <div className='containerPokemons'>
            <PokemonList />
            <button onClick={getOut} className='botonProfile'> Log out</button>
            </div>
            

            
            <div className='opcionesUser'>
                <h3 className='titleCont'>Opciones de usuario</h3>
                <div>
                <button onClick={deleteUser} className='botonProfile'> Delete User</button>
                <button onClick={()=> navigate('/update')} className='botonProfile'> Update User</button>
                </div>
                
            </div>
        </div>
    )
}

export default Profile
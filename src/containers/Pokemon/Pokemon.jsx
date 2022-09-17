import './Pokemon.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { useNavigate } from 'react-router';

import DetailedCard from '../../components/DetailedCard/DetailedCard';
import { useSelector } from 'react-redux';
import { userData } from '../User/userSlice';



const Pokemon = props => {
    let [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();
    const dataUser = useSelector(userData)
    useEffect(() => {

        if (!dataUser?.user) {
            navigate('/');
        }
        
        async function fetchPokemons(){
            await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=99')
            .then(resp => {
                // console.log(resp.data.results)
                setPokemons(resp.data.results);
                
            }).catch(err => {console.error(err)})
        }
        fetchPokemons()

    },[pokemons.results])
    
    const [poke, setPoke] =useState({     
        details: false,
        data: ''
    });

    const showPokemon = (event, pokemon) => {
        setPoke({
            ...poke,
            details: true,
            data: pokemon
        })
    }

    const hidePokemon = (event) => {
        setPoke({
            ...poke,
            details: false,
            data: ""
        })
    }

    const PokeDetailedCard = () => {
        if (poke.data !== "") {
            return(
                <div className='detailedPoke'>
                    <div onClick={hidePokemon}>
                        <DetailedCard data={poke}/>
                    </div>   
                </div>
            )
        }else{
           return(
            <div></div>
           )
        }
    }

    const PokemonList = () => {
        if (pokemons.length > 0) {
            // console.log(pokemons)
            return (
                
                pokemons?.map((pokemon, index) => (
                    <div key={index} onClick={(event) => showPokemon(event, pokemon)}>
                        {/* <Link to='/captura' params={{pokemon}} > */}
                            <PokemonCard data={pokemon} />
                        {/* </Link> */}
                        
                    </div>
                ))
            )
        }else{
            
            return ( 
                <div></div>
            )
        }
    }
    return (
        <div className="pokeWall">
            <PokeDetailedCard/>
            
            <PokemonList />
          
           
        </div>
    )
    
}

export default Pokemon
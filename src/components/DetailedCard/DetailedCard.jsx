
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './DetailedCard.css';
import axios from 'axios'
import { useSelector } from "react-redux";
import { userData } from "../../containers/User/userSlice";

const DetailedCard = props => {

    const dataUser = useSelector(userData);

    const [data, setData] = useState({
        img: '',
        name: '',
        exp: '',
        hp: '',
        ataque: '',
        defensa: '',
        especial: ''
    });

    useEffect(() => {
        async function fetchPoke(){
            try {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.data.data.name}`)
                .then(resp => {
                    setData({
                        ...data,
                        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resp.data.id}.png`,
                        name: resp.data.name,
                        exp: resp.data.base_experience,
                        hp: resp.data.stats[0].base_stat,
                        ataque: resp.data.stats[1].base_stat,  
                        defensa: resp.data.stats[2].base_stat,
                        especial: resp.data.stats[3].base_stat               
                    })
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchPoke()
    },[])

    const addPokemon = async(req, res)  =>{
        try {
            const config = {
                headers: { "Authorization": `Bearer ${dataUser.token}` }
            }
            const poke = await axios.put(`http://localhost:3001/users/addpoke/${dataUser.user._id}`, {
                        img: data.img,
                        name: data.name,
                        exp: data.exp,
                        hp: data.hp,
                        ataque: data.ataque,  
                        defensa: data.defensa,
                        especial: data.especial  
            },config)
            .then(res => {
                alert('Pokemon capturado :D')
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="detailedCard">

            <img src={data.img} alt="" />
            <h3>{data.name}</h3>
            <p>experiencia: {data.exp}</p>
            <p>hp: {data.hp}</p>
            <p>ataque: {data.ataque}</p>
            <p>defensa: {data.defensa} </p>
            <p>especial: {data.especial} </p>

            <button onClick={addPokemon}>Capturar</button>
            
        </div>

    )
}

export default DetailedCard
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './DetailedCard.css';
import axios from 'axios'

const DetailedCard = props => {
// console.log(props.data.data.name)
    
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
                    // console.log(resp.data.id)
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchPoke()
        // setTimeout(() => {
        //     console.log(data)
        // }, 1000);
     
    },[])


    return (
        <div className="detailedCard">
            {/* <h1>{props.data.data.name}</h1> */}
            <img src={data.img} alt="" />
            <h3>{data.name}</h3>
            <p>experiencia: {data.exp}</p>
            <p>hp: {data.hp}</p>
            <p>ataque: {data.ataque}</p>
            <p>defensa: {data.defensa} </p>
            <p>especial: {data.especial} </p>
            
            
            {/* <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"".png" alt="" /> */}
        </div>

    )






}

export default DetailedCard

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './DetailedCard.css';
import axios from 'axios'
import { useSelector } from "react-redux";
import { userData } from "../../containers/User/userSlice";
import { useNavigate } from "react-router";

const DetailedCard = props => {

    const dataUser = useSelector(userData);
    const navigate = useNavigate();

    const [data, setData] = useState({
        img: '',
        name: '',
        exp: '',
        hp: '',
        ataque: '',
        defensa: '',
        especial: ''
    });

    const [userD, setUser] = useState([])

    async function fetchUser() {
        try {
            await axios.get(`http://localhost:3001/users/get/${dataUser.user._id}`)
                .then(resp => {
                    setUser(resp);

                })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {

        async function fetchPoke() {
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
        fetchUser()
        fetchPoke()


    }, [])


    const captura = () => {

        let num = 10 - userD.data.pokemons.length;
        let numR = Math.floor(Math.random() * (10 - 1) + 1);

        if (numR >= num) {
            alert('No has podido capturarlo')

        } else {
            addPokemon()
        }
    }

    const addPokemon = async (req, res) => {
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
            }, config)
                .then(res => {
                    alert('Pokemon capturado :D')
                    navigate('/profile')
                }).catch(err => {
                    console.log(err)
                })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="detailedCard">

            <img className="pokeImg" src={data.img} alt="" />
            <h3 className="pokeName">{data.name}</h3>
            <div className="stats">
                <p className="datos">Experiencia: {data.exp}</p>
                <p className="datos">Salud: {data.hp}</p>
                <p className="datos">Ataque: {data.ataque}</p>
                <p className="datos">Defensa: {data.defensa} </p>
                <p className="datos">Especial: {data.especial} </p>
            </div>


            <button onClick={captura}>Capturar</button>

        </div>

    )
}

export default DetailedCard
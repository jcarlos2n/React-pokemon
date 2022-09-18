import React from 'react'
import './PokeCard.css'

const PokeCard = props => {


    return (
        <div className="pokeCard">
            <img className='pokeCardImg' src={props.data.img} alt={props.data.img} />
            <h3 className='datoUser'>{props.data.name}</h3>
            <div className='stats'>
                <div className='dato'>
                    <div className='datoUser'>Exp: {props.data.exp}</div>
                </div>
                <div className='dato'>
                    <div className='datoUser'>HP: {props.data.hp}</div>
                </div>
                <div className='dato'>
                    <div className='datoUser'>Ataque: {props.data.ataque}</div>
                </div>
                <div className='dato'>
                    <div className='datoUser'>Defensa: {props.data.defensa}</div>
                </div>
                <div className='dato'>
                    <div className='datoUser'>Especial: {props.data.especial}</div>
                </div>

            </div>

        </div>
    )

}

export default PokeCard
import './PokemonCard.css'

const PokemonCard = props => {
    
    return (
        <div className='bodyCard'>
            <h1>{props.data.name}</h1>
        </div>
    )


}

export default PokemonCard
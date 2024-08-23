import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import './PokemonDetails.css';
import usePokemonList from "../../hooks/usePokemonlist";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails() {

    const {id} =useParams();
    const [pokemon] =usePokemonDetails(id);
    return( 
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name"><span>{pokemon.name}</span> </div>
            <img  className="pokemon-details-image" src={pokemon.image} />
            <div  className="pokemon-details-name">Height: {pokemon.height} </div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}> {t} </div>)}
            </div>
        {
            pokemon.types && pokemon.similarPokemons &&
            <div>
                more {pokemon.types[0]} type pokemons
                <ul>
                   { pokemon.similarPokemons.map((p)=> <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
                </ul> 
            </div>
        }

        </div>
    );
        
}

export default PokemonDetails;
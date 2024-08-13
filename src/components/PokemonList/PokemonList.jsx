import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon"

function PokemonList(){
    const [pokemonListState,setpokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
    });
    async function downloadPokemon(){
       
       setpokemonListState((state) =>({...state,isLoading:true}));
        const response = await axios.get(pokemonListState.pokedexUrl)//this download  list of 20 pokemon
             const pokemonResults =response.data.results;//we get thr array of pokemon from result
             console.log(response.data);
            setpokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));
            
            //iterating over the array of pokemon and using their url to create an array of promise
            //that will doenlosf those 20 pokemon
           const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
           
           //passing that promise array to axios.all
           const pokemonData=await axios.all(pokemonResultPromise);//array of 20 polemon detail data
           console.log(pokemonData);
           //now iterate on the data of each  pokemon,and extract id anme image and types
           const pokeListResult = pokemonData.map((pokeData) => {
                  const pokemon = pokeData.data;
                  return {
                     id:pokemon.id,
                     name:pokemon.name, 
                     image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                     types:pokemon.types,
                    }

            });
            console.log(pokeListResult);
            setpokemonListState((state) => ({
                ...state,
                pokemonList:pokeListResult,
                isLoading:false
            }));
           
     }
    useEffect(() => {
        downloadPokemon();
       
    },[pokemonListState.pokedexUrl]);

    return(
        <div className="Pokemon-list-wrapper">
               <div>Pokemon List</div> 

               <div className="pokemon-wrapper">
                    {(pokemonListState.isLoading) ? 'Loading....' : 
                     pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image}  key={p.id} id={p.id} />)
                      }   
               </div>
               <div className="controls button">
                  <button disabled={pokemonListState.prevUrl==null} onClick={() => {
                     const UrlToSet=pokemonListState.prevUrl;
                     setpokemonListState({...pokemonListState,pokedexUrl:UrlToSet})
                    }}>Prev</button>
                  <button disabled={pokemonListState.nextUrl==null} onClick={() =>{
                    const UrlToSet=pokemonListState.nextUrl
                    setpokemonListState({...pokemonListState,pokedexUrl: UrlToSet})
                    }} >Next</button>
               </div>

        </div>


        
    );
}
export default PokemonList;

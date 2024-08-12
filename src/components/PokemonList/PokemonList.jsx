import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon"

function PokemonList(){


    const[PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [pokedexUrl, setpokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl,setNextUrl] =useState('');
    const [prevUrl,setPrevUrl] =useState('');

     async function downloadPokemon(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl)//this download  list of 20 pokemon
             
            const pokemonResults =response.data.results;//we get thr array of pokemon from result
            console.log(response.data);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
            //iterating over the array of pokemon and using their url to create an array of promise
            //that will doenlosf those 20 pokemon
           const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
           
           //passing that promise array to axios.all
           const pokemonData=await axios.all(pokemonResultPromise);//array of 20 polemon detail data
           console.log(pokemonData);
           //now iterate on the data of each  pokemon,and extract id anme image and types
           const pokeResult = pokemonData.map((pokeData) => {
                  const pokemon = pokeData.data;
                  return {
                     id:pokemon.id,
                     name:pokemon.name, 
                     image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                     types:pokemon.types,
                    }

            });
            console.log(pokeResult);
            setPokemonList(pokeResult);
           

           setIsLoading(false);
     }
    useEffect(() => {
        downloadPokemon();
       
    },[pokedexUrl]);

    return(
        <div className="Pokemon-list-wrapper">
               <div>Pokemon List</div> 

               <div className="pokemon-wrapper">
                    {(isLoading) ? 'Loading....' : 
                     PokemonList.map((p) => <Pokemon name={p.name} image={p.image}  key={p.id} id={p.id} />)
                      }   
               </div>
               <div className="controls button">
                  <button disabled={prevUrl==null} onClick={() => setpokedexUrl(prevUrl)}>Prev</button>
                  <button disabled={nextUrl==null} onClick={() => setpokedexUrl(nextUrl)} >Next</button>
               </div>

        </div>


        
    );
}
export default PokemonList;

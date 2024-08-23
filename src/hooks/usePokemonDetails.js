import axios from "axios";
import { useEffect ,useState } from "react";
import usePokemonList from "./usePokemonlist";
function usePokemonDetails(id){

   
    const [pokemon,setPokemon] =useState({});
    async function downloadPokemon (){ 
        const response =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameType =await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name:''}`)
        setPokemon({
          name:response.data.name,
          image: response.data.sprites.other.dream_world.front_default,
          weight:response.data.weight,
          height:response.data.height,
          types:response.data.types.map((t) => t.type.name),
          similarPokemons:pokemonOfSameType.data.pokemon.slice(0,5)    
        });
        
        setpokemonListState({...pokemonListState,type:response.data.types ? response.data.types[0].type.name:''})
      
    }

    const [pokemonListState,setpokemonListState] = usePokemonList();

    useEffect(() =>{
        downloadPokemon();
        console.log("list ",pokemon.list);
    },[]);
    return [pokemon,]

}
export default usePokemonDetails;
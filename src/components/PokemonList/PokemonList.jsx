

import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon"

import usePokemonList from "../../hooks/usePokemonlist";

function PokemonList(){
    
    const [pokemonListState,setpokemonListState]=usePokemonList(false);

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

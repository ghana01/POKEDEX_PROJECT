import PokemonList from "../PokemonList/PokemonList";
import Search from "../search/Search";
//css import
import "./Pokedex.css";
function Pokedex(){
     return(
        <div className="pokedex-wrapper">
           
           <Search/>
           <PokemonList/>
        </div>
     )
}
export default Pokedex;
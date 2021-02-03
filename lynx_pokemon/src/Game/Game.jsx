import React, { useState, useMemo } from "react";
import Countdown from "react-countdown";

const Game = () => {
    const [pokemons, setPokemons] = useState([])
    console.log("pokemons", pokemons);

    const [pokemonFound, setPokemonFound] = useState('')
    console.log("pokemonFound", pokemonFound);

    const [finish, setFinish] = useState(false)

    const [incrementPoint, setIncrementPoint] = useState(0)

    const randomList = () => {
        let tab = []
        for(let i=1; i<=50; i++){
            tab.push(
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                Math.floor(Math.random() * (150 - 1)) + 1
              }.png`
            );
        }
            setPokemons(tab)
            setPokemonFound(tab[Math.floor(Math.random() * (50 - 1)) + 1]);
        }

        const comparePictur = (pokemon) => {
            if (pokemon === pokemonFound) {
                const newIncrement = incrementPoint + 1;
                setIncrementPoint(newIncrement);
            } else {
            }
            setPokemonFound(pokemons[Math.floor(Math.random() * (50 - 1)) + 1]);
        }
        console.log("incrementPoint", incrementPoint);

        
const freezTime = useMemo(() => Date.now(), []);

if (finish){
    return (
      <div>
        <div className="ecartCenter">
          <h1>
            bienjoué {"axios get le pseudo"} tu as eu {incrementPoint} match
          </h1>
        </div>
        <div className="ecartCenter">
          <button onClick={"axios post"}>home page</button>
        </div>
      </div>
    );
}
  return (
    <div>
      <div className="ecartSpace">
        <div className="timerAndpokemonfound">
          <h1 className="Increment">{incrementPoint}</h1>
          <img className="pokemon" src={pokemonFound} alt={pokemonFound} />
          <Countdown
            className="timer"
            onComplete={() => setFinish(true)}
            date={freezTime + 3000}
            />
        </div>
        <div className="pseudo">
          <h1>post axios</h1>
        </div>
      </div>
      <div className="listPokemon">
        {pokemons.length < 1 && (
            <div className="global">
            <button className="button" onClick={randomList}>
              play
            </button>
          </div>
        )}

        {pokemons.map((pokemon) => {
            return (
                <div className="alonePokemone">
              <img
                className
                src={pokemon}
                alt={pokemon}
                onClick={() => comparePictur(pokemon)}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Game

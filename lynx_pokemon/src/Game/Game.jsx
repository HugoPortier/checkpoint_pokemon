/* eslint-disable no-lone-blocks */
import React, { useState, useMemo, useEffect } from "react";
import axios from 'axios'
import Countdown from "react-countdown";
import { Form } from "semantic-ui-react";


const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  console.log("pokemons", pokemons);

  const [pokemonFound, setPokemonFound] = useState("");
  console.log("pokemonFound", pokemonFound);

  const [finish, setFinish] = useState(false);

  const [incrementPoint, setIncrementPoint] = useState(0);

  const [name, setname] = useState([]);
  console.log("nameee", name);

  const [incrementPseudo, setincrementPseudo] = useState("");

{/* FONCTION QUI PERMET DE RANDOME LAFFICHAGE DE MES POKEMON */}

  const randomList = () => {
    let tab = [];
    for (let i = 1; i <= 50; i++) {
      tab.push(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          Math.floor(Math.random() * (150 - 1)) + 1
        }.png`
      );
    }
    setPokemons(tab);
    setPokemonFound(tab[Math.floor(Math.random() * (50 - 1)) + 1]);
  };

{/* FONCTION QUI PERMET DE COMPARER LE LIEN ET DE VALIDER UN MATCH */}

  const comparePictur = (pokemon) => {
    if (pokemon === pokemonFound) {
      const newIncrement = incrementPoint + 1;
      setIncrementPoint(newIncrement);
    } else {
    }
    setPokemonFound(pokemons[Math.floor(Math.random() * (50 - 1)) + 1]);
  };
  console.log("incrementPoint", incrementPoint);

{/* GET AXIOS */}

  useEffect(() => {
    axios.get(`http://localhost:5000/getState`).then((res) => {
      console.log("bbbbbbbb", res.data);
      setname(res.data);
    });
  }, []);

{/* POST AXIOS */}

  const pushDataBdd= ()=>{
     axios.post(`http://localhost:5000/postState`, [
       { pseudo: incrementPseudo, point: incrementPoint },
     ]);
     setFinish(true)
  }

  console.log({ incrementPseudo });

{/* DELETE AXIOS */}

    const deleteListPseudo = () => {
      axios.delete(`http://localhost:5000/getState`)
    }

{/* SIMPLE USE MEMO */}

  const freezTime = useMemo(() => Date.now(), []);

{/* TEXT QUI AFFICHE LE RESULTAT DE MATCH */}

  if (finish) {
    return (
      <div>
        <div className="ecartCenter">
          <h1>
            bien joué tu as eu {incrementPoint} match
          </h1>
        </div>

{/* BOUTON QUI REMET A ZERO ET RELANCE LE JEUX */}

        <div className="ecartCenter">
          <button onClick={() => window.location.reload()}>home page</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="postPosition">
        {/* CONTEUR DE POINT */}

        <div className="timerAndpokemonfound">
          {pokemons.length > 1 && (
            <h1 className="Increment">{incrementPoint}</h1>
          )}

          {/* POKEMON FOUND  */}

          <img className="pokemon" src={pokemonFound} alt={pokemonFound} />

          {/* CHRONO */}

          {pokemons.length > 1 && (
            <Countdown
              className="timer"
              onComplete={() => pushDataBdd()}
              date={freezTime + 30000}
            />
          )}
        </div>

        {/* AFFICHAGE DE L'APPELLE AXIOS DANS LE BORDER */}

        {pokemons.length > 1 && (
          <div className="pseudo">
            <h1>post axios</h1>
            {name.map((pseudoName) => {
              return (
                <div className="pseudoTag">
                  <p>
                    {pseudoName.pseudo} {pseudoName.point}
                  </p>
                </div>
              );
            })}
            <button onClick={deleteListPseudo}>X</button>
          </div>
        )}
      </div>

      {/* BUTTON COMMENCER LE JEUX */}

      <div>
        {pokemons.length < 1 && (
          <div className="ecartCenter">
            <button className="button" onClick={randomList}>
              play
            </button>
          </div>
        )}

        {/* CHAMP INPUT PSEUDO*/}

        {pokemons.length < 1 && (
          <Form>
            <Form.Group>
              <div className="inpute">
                <h1>Rentre ton pseudo avant de jouer</h1>
                <Form.Field
                  className="inputSubmite"
                  control="input"
                  placeholder="enter pseudo"
                  value={incrementPseudo}
                  name="pseudonyme"
                  onChange={(e) => setincrementPseudo(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        )}

        {/* LISTE DES POKEMONS */}

        <div className="listPokemon">
          {pokemons.map((pokemon) => {
            return (
              <div>
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
    </div>
  );
}

export default Game

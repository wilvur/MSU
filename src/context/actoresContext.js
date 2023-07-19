import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ActoresContext = createContext();

const ActoresProvider = ({ children }) => {
    const [datosRecopilados, setDatosRecopilados] = useState([]);
    const [universos, setUniversos] = useState([]);
    
    useEffect(() => {
      const obtenerDatos = async () => {
        try {
          const response = await axios.get('/data/datos_recopilados.json');
          setDatosRecopilados(response.data);
        } catch (error) {
          console.error('Error al obtener los datosRecopilados', error);
        }
      };
      const obtenerUniversos = async () => {
        try {
          const response = await axios.get('/data/datos_universos.json');
          setUniversos(response.data);
        } catch (error) {
          console.error('Error al obtener los datos universo', error);
        }
      };

      obtenerUniversos();
      obtenerDatos();
    }, []);
  
  // funciones 
  function getFalopaFactor (cantPeliculas, cantUniversos, ranking) {
        const calcular  = (cantPeliculas * cantUniversos * ranking).toFixed(2)
        return calcular
  }

  function getDatosActorPorID(actorId) {
      const concurrenciaUniversos = {};
      let ranking = 0;
      const peliculasActor = datosRecopilados.filter((dato) => dato.actor_id === actorId );
      
      // para obtener los universos
      peliculasActor.forEach((pelicula) => {
        const universo = pelicula.universo;
          if (concurrenciaUniversos[universo]) {
            concurrenciaUniversos[universo]++;
          } else {
            concurrenciaUniversos[universo] = 1;
          }
      });

      // para calcular ranking de peliculas
      peliculasActor.forEach((pelicula) => {
        ranking += pelicula.ranking;
      });
      const universosList = Object.keys(concurrenciaUniversos)
      const universosCant = universosList.length
      // datos para enviar 
      const datos = {
        "actor_id": actorId,
        "actor_name": peliculasActor.length > 0 ? peliculasActor[0].actor_name : "",
        "actor_link": peliculasActor.length > 0 ? peliculasActor[0].actor_link : "",
        "PeliculasCantidad": peliculasActor.length,
        "universos": universosList,
        "universoCantidad" : Object.keys(concurrenciaUniversos).length,
        "ranking" : ranking / peliculasActor.length,
        "ff": getFalopaFactor( peliculasActor.length, universosCant , ranking / peliculasActor.length)
      };

      return {datos, peliculasActor} ;
    }

    return (
      <ActoresContext.Provider
        value={{
          datosRecopilados,
          universos,
          getDatosActorPorID
          // Agrega otras funciones o estados que desees compartir
        }}
      >
        {children}
      </ActoresContext.Provider>
    );
  };
  
  export { ActoresContext, ActoresProvider };

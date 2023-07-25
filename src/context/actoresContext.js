import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ActoresContext = createContext();

const ActoresProvider = ({ children }) => {
  ///////////  Estados 
    const [datosRecopilados, setDatosRecopilados] = useState([]);
    const [actores, setActores] = useState([]);
    const [movies, setMovies] = useState([]);
    const [universos, setUniversos] = useState([]);
  
  /////////////  preparacion de datos 

    useEffect(() => {
      const obtenerActores = () => {
        return axios.get('/data/datos_actores.json')
          .then(response => response.data)
          .catch(error => {
            console.error('Error al obtener los actores', error);
            return [];
          });
      };
    
      const obtenerPeliculas = () => {
        return axios.get('/data/datos_movies.json')
          .then(response => response.data)
          .catch(error => {
            console.error('Error al obtener las peliculas', error);
            return [];
          });
      };
    
      const obtenerUniversos = () => {
        return axios.get('/data/datos_universos.json')
          .then(response => response.data)
          .catch(error => {
            console.error('Error al obtener los datos universo', error);
            return [];
          });
      };
    
      const recopilarDatos = (actores, movies) => {
        const datosACC = [];
        for (let i = 0; i < actores.length; i++) {
          const actor = actores[i];
          const movieID = actor.movie_ID;
          const movie = movies.find((movie) => movie.movie_ID === movieID);
    
          if (movie) {
            const datosCombinados = { ...actor, ...movie };
            datosACC.push(datosCombinados);
          }
        }
        setDatosRecopilados(datosACC);
      };
    
      const fetchData = async () => {
        try {
          const actoresData = await obtenerActores();
          const moviesData = await obtenerPeliculas();
          const universosData = await obtenerUniversos();
          setUniversos(universosData)
          setMovies(moviesData)
          recopilarDatos(actoresData, moviesData);
        } catch (error) {
          console.error('Error en la obtención de datos', error);
        }
      };
      
      fetchData();
    }, []);
    
 
  // arma la concurrencia por Peliculas
  const recuentoActores = {};
  
  datosRecopilados.forEach((dato) => {
  const actorId = dato.actor_ID;
  if (recuentoActores[actorId]) {
      recuentoActores[actorId]++;
  } else {
      recuentoActores[actorId] = 1;
  }
  });

  // ordeno la concurrencia y la limito
    const actoresOrdenados = Object.entries(recuentoActores).sort( (a, b) => b[1] - a[1]).slice(0,100);
  
    // empiezo armar la lista a mostrar 
    const listaMostrar = actoresOrdenados.map((actor) => {
    const actorId = actor[0];
    const datosActor =getDatosActorPorID(actorId);
    return datosActor
})
  
  // funciones 
  function getFalopaFactor (cantPeliculas, cantUniversos, ranking) {
        const calcular  = (cantPeliculas * cantUniversos * ranking).toFixed(2)
        return calcular
  }

  function getDatosActorPorID(actorId) {
        const concurrenciaUniversos = {};
        let ranking = 0;
        const peliculasActor = datosRecopilados.filter((dato) => dato.actor_ID === actorId );
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

    const getDatosMoviePorID = (movieId) => {
      // Utilizamos el método find para encontrar la película con la ID proporcionada
      const pelicula = movies.find((movie) => movie.movie_ID === movieId);
    
      // Si se encuentra la película, devolvemos sus datos
      if (pelicula) {
        return pelicula;
      } else {
        // Si no se encuentra la película, devolvemos null o un valor predeterminado
        return null;
      }
    };
    
    return (
      <ActoresContext.Provider
        value={{
          datosRecopilados,
          universos,
          listaMostrar,
          movies,
          getDatosMoviePorID
          // Agrega otras funciones o estados que desees compartir
        }}
      >
        {children}
      </ActoresContext.Provider>
    );
  };
  
  export { ActoresContext, ActoresProvider };

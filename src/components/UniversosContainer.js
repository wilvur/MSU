import React, {useContext, useState} from 'react'
import { ActoresContext } from '../context/actoresContext';
import UniversoCard from './UniversoCard';
import MovieCard from './MovieCard';

export default function UniversosContain() {

const { datosRecopilados, universos, movies } = useContext(ActoresContext);
  //datos a usar 
  const [listaPeliculas, setListaPeliculas] = useState([])

  // función que prepara los datos
  const resultadosPorUniverso = universos.reduce((result, universo) => {
        const { id, descripcion } = universo;

        const filteredData = datosRecopilados.filter(
        actor => actor.universo === id
        );
        
        const cantidadTitulos = new Set(filteredData.map(actor => actor.title)).size;
        const cantidadActores = new Set(filteredData.map(actor => actor.actor_name)).size;

        const promedioRanking =
        filteredData.reduce((total, actor) => total + actor.ranking, 0) /
        filteredData.length;
    
        result[id] = {
        id,
        descripcion,
        cantidadTitulos,
        cantidadActores,
        promedioRanking,
        };
    
        return result;
  }, {});


  const filtrarPeliculasPorUniverso = (universo) => {
     const listaPeliculas = movies.filter( pelicula => pelicula.universo === universo);
     setListaPeliculas(listaPeliculas)  
     console.log(listaPeliculas)
  }


  return (
    <div className='w-full flex-col border mb-4'>
        <div className='w-full p-2 m-2 text-lg' >Universos </div>
        <div className='flex w-full justify-around p-2'>
        {Object.keys(resultadosPorUniverso).map(universo => {
            const uni = resultadosPorUniverso[universo];
            return (
              <UniversoCard 
                key={uni.id}
                id={uni.id}
                nombre = {uni.descripcion}
                cantidadTitulos={uni.cantidadTitulos}
                cantidadActores={uni.cantidadActores}
                promedioRanking={uni.promedioRanking.toFixed(2)}   
                filtrarPeliculas ={filtrarPeliculasPorUniverso}              
              />
            );
          })}    
        </div>
          {Array.isArray(listaPeliculas) && listaPeliculas.length > 0 ? (
            <div className='w-full p-2'>
              <div className='w-full flex justify-between'> 
                <div onClick={()=> setListaPeliculas([])}>Peliculas por Universos</div> 
              </div> 
              <div className='grid grid-cols-4'>
                {listaPeliculas.map(pelicula => (
                  <MovieCard key={pelicula.movie_ID} movieId={pelicula.movie_ID} />
                ))}
              </div>         
            </div>
          ) : null}
          

    </div>
  )
}

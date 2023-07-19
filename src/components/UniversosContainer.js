import React, {useContext, useState} from 'react'
import { ActoresContext } from '../context/actoresContext';
import UniversoCard from './UniversoCard';

export default function UniversosContain() {

const { datosRecopilados, universos } = useContext(ActoresContext);
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
    const listaPeliculas = datosRecopilados.filter( pelicula => pelicula.universo === universo);
    const titulos  = new Set(listaPeliculas.map(actor => actor.title))
    setListaPeliculas(titulos)
  };
  


  return (
    <div className='w-full flex-col border mb-4'>
        <div className='w-full p-2 m-2 text-lg'>Universos </div>
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
        <div className='w-full p-2'>
        <div className='w-full flex justify-between transition ease-in-out delay-150 '> 
         <div>Peliculas</div> 
         <div onClick={()=> setListaPeliculas([])}>Cerrar</div> 

        </div> 
      
         <div className='grid grid-cols-4'>
         {Array.from(listaPeliculas).map((titulo) => (
           <div className="text-xs p-1 m-1 border" key={titulo}>{titulo}</div>
         ))}
       </div>
        
         
         
        </div>
    </div>
  )
}

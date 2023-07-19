import React, {useContext, useState} from 'react'
import { ActoresContext} from '../context/actoresContext';

export default function ActoresListContainer() {

const { datosRecopilados,  getDatosActorPorID } = useContext(ActoresContext);
const [limite, setLimite] = useState(20)
const [expandedRows, setExpandedRows] = useState([]);

// arma la concurrencia 
const recuentoActores = {};
      datosRecopilados.forEach((dato) => {
      const actorId = dato.actor_id;

      if (recuentoActores[actorId]) {
          recuentoActores[actorId]++;
      } else {
          recuentoActores[actorId] = 1;
      }
});
 
// ordeno la concurrencia y la limito
const actoresOrdenados = Object.entries(recuentoActores).sort( (a, b) => b[1] - a[1]).slice(0,limite);
  
// empiezo armar la lista a mostrar 
 const listaMostrar = actoresOrdenados.map((actor) => {
    const actorId = actor[0];
    const datosActor =getDatosActorPorID(actorId);
    return datosActor
  })

  const handleRowClick = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  return (
    <div className='mb-3'>
    <div className='w-full p-2 m-2 text-lg'>Partición de Actores por Peliculas</div>
    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
    <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Actor
            </th>
            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Cant. de Peliculas 
            </th>
            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
               Universos 
           </th>
           <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Prom. Ranking Peliculas IMDB
          </th>
            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Peliculas 
            </th>
 
            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Falopas Factor
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {listaMostrar.map( (a , index)  => { 
          return( 
              <tr onClick={() => handleRowClick(index)} key={a.datos.actor_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">  
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{index +  1} - <a href={a.datos.actor_link} target='_black'>{a.datos.actor_name} </a></td>
                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{a.datos.PeliculasCantidad}  </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ({a.datos.universoCantidad}) -  {a.datos.universos.map( (u, index) => (<span className='text-xs' key={index}>{u} </span>))}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{(a.datos.ranking).toFixed(2)}  </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {expandedRows.includes(index) ? 
                    a.peliculasActor.map( p => (<div className='text-xs' key={p.movie_id}>{p.title} - {p.personaje}</div>)) : <td>Peliculas</td>
                  }
                </td>
           
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {a.datos.ff}
                </td>
              </tr>  
          )
        })}
    </tbody>
</table>
   
</div>
  )
}

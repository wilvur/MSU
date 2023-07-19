import React, {useContext, useState} from 'react'
import { ActoresContext} from '../context/actoresContext';

export default function  ActoresMultiContainer() {

    const { datosRecopilados, getDatosActorPorID } = useContext(ActoresContext);
    const [ limite, setLimite] = useState(10)

    // para calcular la concurrencia de los actores
    function actoresConMayorConcurrencia() {
        const concurrenciaActores = {};
      
        datosRecopilados.forEach((dato) => {
          const actorId = dato.actor_id;
          const universo = dato.universo;
      
          if (concurrenciaActores[actorId]) {
            if (!concurrenciaActores[actorId].universos.includes(universo)) {
              concurrenciaActores[actorId].universos.push(universo);
            }
          } else {
            concurrenciaActores[actorId] = {
              "actor" : getDatosActorPorID(actorId)
            };
          }
        });
      
        const actoresOrdenados = Object.values(concurrenciaActores).sort(
          (a, b) => b.universos.length - a.universos.length
        ).slice(0,limite);
      
        return actoresOrdenados;
      }
    
const actoresConcurrencia = actoresConMayorConcurrencia();

return (
  <div className='mb-3'>
  <div className='w-full p-2 m-2 text-lg'>Partición de Actores por Universo</div>
  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
  <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Actor
          </th>
          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Universos Partición
          </th>
          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Universos
          </th>
          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
              Personajes
      </th>
      </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {actoresConcurrencia.map( a => {
          return( 
              <tr  key={a.actor_name} className="hover:bg-gray-100 dark:hover:bg-gray-700">  
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.actor_name}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{a.universos.length}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 <ul>
                  {a.universos.map((universo) => (
                      <li key={universo}>{universo}</li>
                  ))}
                  </ul>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <ul>
                  {a.peliculasList.map((p) => (
                    <li key={p.movie_ID}>{p.personaje} - ({p.universo})</li>
                  ))}
                </ul>
                </td>
              </tr>  
          )
      })}
  </tbody>
</table>
 
</div>
)
}

import React from 'react'

export default function UniversoCard( { id, nombre, cantidadTitulos, cantidadActores, promedioRanking, filtrarPeliculas }) {
  return (
    <div className='flex-col p-2 text-sm border round-md'
     onClick={()=> filtrarPeliculas(id) }
    >
    <div className=' font-semibold'>{nombre}</div>
    <div>Peliculas: {cantidadTitulos}</div>
    <div>Actores: {cantidadActores}</div>
    <div>Ranking: {promedioRanking}</div>
  </div>
  )
}

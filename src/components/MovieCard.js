import { useContext, useState } from "react"
import { ActoresContext } from '../context/actoresContext';
import { useEffect } from "react";


export default function MovieCard(movieId) {
  const {getDatosMoviePorID} = useContext(ActoresContext)
  const [movieData, SetMovieData] = useState([])

 useEffect(() => {
    const id = movieId.movieId
    const datosPelicula = getDatosMoviePorID(id);
    SetMovieData(datosPelicula) 
 }, [])
 
  return (
    <div className='flex p-1 m-1 border rounded-sm'>
        <div className='w-[120px]'>
                <img  className="bg-cover w-full h-full" src={movieData.Poster} alt={movieData.title}></img>
         </div>
         <div className='mx-4'>
            <div className='text-md'>{movieData.title}</div>
            <div className='text-xs'><span className="font-bold" >Director: </span>{movieData.Director}</div>
            <div className='text-xs'><span className="font-bold" >Ranking:  </span>{movieData.ranking}</div>
            <div className='text-xs'><span className="font-bold" >Released: </span> {movieData.Released}</div>
            <div className='text-xs'><span className="font-bold" >BoxOffice: </span>{movieData.BoxOffice}</div>
            <div className='text-xs'>{movieData.year}</div>{}
        </div>
    </div>

  )
}

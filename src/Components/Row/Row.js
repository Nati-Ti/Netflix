import axios from '../Axios';
import React, { useEffect, useState } from 'react'
import "./row.css"
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        const fetchMovie = async() =>{
            try{
                const response = await axios.get(fetchUrl);
                setMovies(response.data.results);
                // console.log(response);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchMovie();
    }, [fetchUrl]);


    function trailerSearch(movieName){
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movieName?.title || movieName.original_title)
            .then((res) =>{
                setTrailerUrl(res);
                console.log(res);
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className='row'>
            <h2 className='row--title'>{title}</h2>
            <div className="row--poster">
                {movies.map((movie) => {
                    return (
                    <img onClick={() => {trailerSearch(movie)}} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} key={movie.id} className={`row--poster__img ${isLargeRow && "row--posterLarge"}`}></img>                    
                )})}               
            </div>
            <div className='row--poster--trailer'>
                {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} controls={true} width="1080px"
                height="480px" />}
            </div>
        </div>
    )
}

export default Row;
import React, { useState, useEffect } from 'react'
import axios from '../Axios';
import './banner.css'

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner({fetchUrl}) {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async() =>{
            try{
                const response = await axios.get(fetchUrl);
                setMovie(response.data.results[Math.floor(Math.random()* response.data.results.length)]);
                // console.log(response);
            }
            catch(error){
                console.log(error);
            }
        };

        fetchMovie();
    }, [fetchUrl]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("${base_url}${movie.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className='banner--contents'>
                <h1 className='banner__title'>
                    {movie.title || movie.original_name}
                </h1>

                <div className='banner__buttons'>
                    <button className="banner__button"><a href='/watch'>Play</a></button>
                    <button className="banner__button"><a href='/addToList'>My List</a></button>
                </div>

                <h3 className='banner__description'>{truncate(movie.overview, 150)}</h3>             
            </div>

            <div className="banner__fadeBottom" />
        </div>
    )
}

export default Banner
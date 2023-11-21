import axios from '../Axios';
import React, { useEffect, useState, useRef } from 'react';
import './row.css';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import { useInView } from 'react-intersection-observer';

const base_url = "https://image.tmdb.org/t/p/original/";
const placeholderImageUrl = "https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg"; 

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [fetchUrl]);

  function trailerSearch(movieName) {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movieName?.title || movieName.original_title)
        .then((res) => {
          setTrailerUrl(res);
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  }

  const imageObserver = useRef(null);

  useEffect(() => {
    imageObserver.current = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const src = image.getAttribute('data-src');

          if (!src) return;

          image.setAttribute('src', src);
          image.removeAttribute('data-src');

          observer.unobserve(image);
        }
      });
    });

    return () => {
      if (imageObserver.current) {
        imageObserver.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll('.row--poster__img');

    images.forEach((image) => {
      imageObserver.current.observe(image);
    });

    return () => {
      if (imageObserver.current) {
        imageObserver.current.disconnect();
      }
    };
  }, [movies]);

  return (
    <div className="row" ref={ref}>
      <h2 className="row--title">{title}</h2>
      <div className="row--poster">
        {movies.map((movie) => (
          <img
            onClick={() => {
              trailerSearch(movie);
            }}
            src={placeholderImageUrl}
            data-src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title}
            key={movie.id}
            className={`row--poster__img ${isLargeRow && "row--posterLarge"}`}
          />
        ))}
      </div>
      <div className="row--poster--trailer">
        {trailerUrl && inView && (
          <ReactPlayer
            url={trailerUrl}
            playing={true}
            controls={true}
            width="1080px"
            height="480px"
          />
        )}
      </div>
    </div>
  );
}

export default Row;
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import movieService from 'utils/moviedb';
import * as style from './MovieDetails.styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [filmData, setFilmData] = useState({});

  useEffect(() => {
    async function fetchdata() {
      try {
        const data = await movieService.getFilmsById(movieId);
        setFilmData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [movieId]);

  const { poster_path, original_title, vote_average, overview, genres } =
    filmData;

  return (
    <>
      <style.FilmCard>
        {!poster_path ? (
          <Skeleton height={373} width={264} />
        ) : (
          <style.Poster
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          />
        )}
        <style.TextFields>
          <h2>{original_title || <Skeleton width={400} />}</h2>
          {vote_average ? (
            <p>User Score: {Math.round(vote_average * 10)}%</p>
          ) : (
            <p>
              <Skeleton width={200} />
            </p>
          )}
          <h3>{overview ? 'Overview' : <Skeleton width={200} />}</h3>
          <p>{overview || <Skeleton count={3} />}</p>
          <h3>{overview ? 'Genres' : <Skeleton width={200} />}</h3>
          {overview ? (
            <p>{genres.map(e => e.name).join(' ')}</p>
          ) : (
            <p>
              <Skeleton width={200} />
            </p>
          )}
        </style.TextFields>
      </style.FilmCard>
      <style.AdditionalInfo>
        <p>Additional information</p>
        <ul>
          <style.item>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </style.item>
          <style.item>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </style.item>
        </ul>
      </style.AdditionalInfo>
      <Outlet />
    </>
  );
};

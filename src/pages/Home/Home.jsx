import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from 'utils/moviedb';
import * as style from './Home.styled';

export const Home = () => {
  const [trendingFilms, setTrendingFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { results: films } = await movieService.getFilmsPopular();
        setTrendingFilms(
          films.map(film => ({
            id: film.id,
            title: film.original_title,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trendingFilms?.map(film => (
          <style.item key={film.id}>
            <Link to={`/movies/${film.id}`}>{film.title}</Link>
          </style.item>
        ))}
      </ul>
    </>
  );
};

import { Searchbar } from 'components/SearchBar/Searchbar';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as style from '../Home/Home.styled';
import { useState } from 'react';
import movieService from 'utils/moviedb';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedFilms, setSearchedFilms] = useState([]);
  const query = searchParams.get('query') ?? '';

  const changeQuery = query => {
    setSearchParams(query ? { query } : {});
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchData() {
      try {
        const { results: films } = await movieService.getFilmsSearched(query);
        setSearchedFilms(
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
  }, [query]);

  return (
    <>
      <Searchbar value={query} onSubmit={changeQuery} />
      <ul>
        {searchedFilms?.map(film => (
          <style.item key={film.id}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              {film.title}
            </Link>
          </style.item>
        ))}
      </ul>
    </>
  );
};

export default Movies;

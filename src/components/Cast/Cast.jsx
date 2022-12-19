import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import movieService from 'utils/moviedb';
import * as style from './Cast.styled';
import { nanoid } from 'nanoid';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchdata = async id => {
      try {
        const data = await movieService.getFilmCast(movieId);
        setCast(
          data.cast.map(actor => ({
            profile_path: actor.profile_path,
            character: actor.character,
            name: actor.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cast.map(a => {
          return (
            <style.item key={nanoid()}>
              <img
                src={
                  'https://www.themoviedb.org/t/p/w138_and_h175_face' +
                  a.profile_path
                }
                alt={a.character}
                width={120}
              />
              <div>
                <h3>{a.name}</h3>
                <p>
                  <i>{a.character}</i>
                </p>
              </div>
            </style.item>
          );
        })}
      </ul>
    </div>
  );
};

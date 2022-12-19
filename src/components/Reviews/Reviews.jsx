import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import movieService from 'utils/moviedb';
import * as style from './Reviews.styled';
import { nanoid } from 'nanoid';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchdata = async id => {
      try {
        setIsloading(true);
        const data = await movieService.getFilmReviews(movieId);
        setReviews(
          data.results.map(review => ({
            author: review.author,
            content: review.content,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchdata();
  }, [movieId]);

  if (isLoading) {
    return <p>lOADING...</p>;
  }
  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }
  return (
    <div>
      <ul>
        {reviews.map(a => {
          return (
            <style.item key={nanoid()}>
              <h3>Author: {a.author}</h3>
              <div>
                <p>
                  <i>{a.content}</i>
                </p>
              </div>
            </style.item>
          );
        })}
      </ul>
    </div>
  );
};

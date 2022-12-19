import { Outlet } from 'react-router-dom';
import * as style from './Header.styled';
import { Suspense } from 'react';

export const Header = () => {
  return (
    <style.Container>
      <style.Header>
        <nav>
          <style.Link to="/" end>
            Home
          </style.Link>
          <style.Link to="movies">Movies</style.Link>
        </nav>
      </style.Header>
      <Suspense fallback={<div>LOADING COMPONENTS...</div>}>
        <Outlet />
      </Suspense>
    </style.Container>
  );
};

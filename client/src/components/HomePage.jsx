import React from 'react';
import { useSelector} from 'react-redux';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {
        currentUser ? (
          <Home />
        ) : (
          <Welcome />
        )
      }
    </div>
  )
}

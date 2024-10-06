import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes';

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
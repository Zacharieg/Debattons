import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import App from './App';
import LocalPlay from './routes/LocalPlay';
import Game from './routes/Game';
import Home from './routes/Home';
import LocalGame from './routes/LocalGame';
import Play from './routes/Play';
import End from './routes/End';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage />,
    children : [
      {
        path : "localplay",
        element : <LocalPlay />
      },
      {
        path : "localgame",
        element : <LocalGame/>
      },
      {
        path : "play",
        element : <Play/>
      },
      {
        path : "game",
        element : <Game/>
      },
      {
        path : "end",
        element : <End/>
      },
      {
        path : "",
        element : <Home/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

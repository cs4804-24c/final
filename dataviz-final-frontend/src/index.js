import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import ErrorPage from "./error-page";
import Homepage from "./Homepage/Homepage";
import PlayerPage from "./PlayerPage/PlayerPage";
import GamePage from "./GamePage/GamePage";
import ParallelPlotPlage from "./ParallelPlotPage/ParallelPlotPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/playerpage/:playerId',
        element: <PlayerPage />
    },
    {
        path:'/game/:gameId',
        element: <GamePage/>
    },
    {
        path:'/parallelplot',
        element: <ParallelPlotPlage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import Applayout from "./components/layout/Applayout";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import './App.css'


import { createBrowserRouter, RouterProvider } from "react-router-dom"
import getAllMovie from "./API/getAllMovie";
import getMovieDetails from "./API/getMovieDetails";
import MovieDetail from "./pages/MovieDetail";

const App = () => {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Applayout />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader:getAllMovie
        },
        {
          path:'/:movieID',
          element:<MovieDetail/>,
          loader:getMovieDetails
        },
        {
          path: '/webseries',
          element: <Home />,
          loader:getAllMovie
        },
        {
          path: '/webseries/:movieID',
          element:<MovieDetail/>,
          loader:getMovieDetails
        },
        
      ]
    },


  ]);

  return <RouterProvider router={router} />

}

export default App
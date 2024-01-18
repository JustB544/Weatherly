/** Contains all routes */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './Home';
import LocationDetail, {locationDetailLoader} from './LocationDetail/LocationDetail';
import App from './App';

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: ":location",
        loader: locationDetailLoader,
        element: <LocationDetail />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }]);

export default router;
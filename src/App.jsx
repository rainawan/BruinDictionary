import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from './routes/Add';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './pages/Navbar';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/add',
          element: <Add />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from './routes/Add';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';
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

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

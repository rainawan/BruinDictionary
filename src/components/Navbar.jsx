import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/add">Add</Link>
      <Outlet />
    </nav>
  );
};

export default Navbar;

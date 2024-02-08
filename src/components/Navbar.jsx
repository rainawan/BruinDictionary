import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/add">Add</Link>
    </nav>
  );
};

export default Navbar;

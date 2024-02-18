import { Link, Outlet } from 'react-router-dom';
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Avatar } from '@nextui-org/react';
import { PlusOutlined } from '@ant-design/icons';
import ProfileAvatar from './ProfileAvatar';

const Navbar = () => {
  return (
    <div className="bg-gray-700">
      <Nav className="bg-gray-700 py-2" position="static" height="3rem" shouldHideOnScroll>
        <NavbarBrand>
          <NavLink to="/" className="font-bold text-lg">
            BRUIN DICTIONARY
          </NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 justify-center">
          <NavbarItem>
            <NavLink to="/">HOME</NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <NavLink to="/add">
              <Avatar color="primary" icon={<PlusOutlined className="text-base" />} size="sm" />
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/login">
              <ProfileAvatar />
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      </Nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

const NavLink = ({ to, className, children }) => {
  return (
    <Link to={to}>
      <a className={`text-white hover:text-gray-300 ${className}`}>{children}</a>
    </Link>
  );
};

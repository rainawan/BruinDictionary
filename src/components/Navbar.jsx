import { Link, Outlet } from 'react-router-dom';
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Avatar } from '@nextui-org/react';
import { PlusOutlined } from '@ant-design/icons';
import ProfileAvatar from './ProfileAvatar';
import Searchbar from './Searchbar.jsx';

const Navbar = () => {
  return (
    <div className="inline-block w-full">
      <Nav className="bg-gray-700 pb-2" position="static" height="fit" shouldHideOnScroll>
        <div className="flex-col w-full">
          <NavbarContent className="py-3">
            <NavbarBrand>
              <Link to="/" className="font-bold text-lg text-white hover:text-gray-300">
                BRUIN DICTIONARY
              </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link to="/" className="text-white hover:text-gray-300">
                  HOME
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Link to="/add">
                  <Avatar color="primary" icon={<PlusOutlined className="text-base" />} size="sm" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/login">
                  <ProfileAvatar />
                </Link>
              </NavbarItem>
            </NavbarContent>
          </NavbarContent>
          <Searchbar />
        </div>
      </Nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

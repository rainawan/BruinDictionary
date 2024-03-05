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
            <NavbarBrand className="max-w-[12rem]">
              <Link to="/" className="font-bold text-lg text-white hover:text-gray-300">
                BRUIN DICTIONARY
              </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex" justify="start">
              <NavbarItem className="flex gap-3">
                <Link to="/" className="text-white hover:text-gray-300 text-sm">
                  Categories
                </Link>
                <Link to="/" className="text-white hover:text-gray-300 text-sm">
                  HOF
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Link to="/add">
                  <Avatar
                    size="sm"
                    color="primary"
                    icon={<PlusOutlined className="text-base" />}
                    className="hover:scale-110 transition-transform"
                  />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/user">
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

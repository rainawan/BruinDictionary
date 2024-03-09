import { Link, Outlet } from 'react-router-dom';
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Avatar } from '@nextui-org/react';
import { PlusOutlined } from '@ant-design/icons';
import ProfileAvatar from './ProfileAvatar';
import Searchbar from './Searchbar.jsx';
import white_logo from '../assets/white_logo.svg';

const Navbar = () => {
  return (
    <div className="inline-block w-full">
      <Nav className="bg-gray-700 pb-2" position="static" height="fit" shouldHideOnScroll>
        <div className="flex-col w-full">
          <NavbarContent className="py-3">
            <NavbarBrand className="max-w-[7rem]">
              <Link to="/" className="font-bold text-lg text-white hover:text-gray-300">
                <img src={white_logo} alt="white logo" className="w-[5rem] ml-2" />
              </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex" justify="center">
              <NavbarItem className="flex gap-3">{/* extra feature pages */}</NavbarItem>
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

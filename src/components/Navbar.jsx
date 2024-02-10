import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar } from '@nextui-org/react';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const NavBar = () => {
  return (
    <div className="NavBar">
      <Navbar className="bg-transparent py-2" position="static" height="3rem" shouldHideOnScroll>
        <NavbarBrand>
          <Link to="/">HOME</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/">HOME</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to="/add">
              <Avatar icon={<PlusOutlined className="text-base" />} size="sm" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/login">
              <Avatar icon={<UserOutlined className="text-base" />} size="sm" />
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default NavBar;

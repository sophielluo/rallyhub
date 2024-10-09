import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { MdModeComment, MdExplore, MdInfo, MdOutlineHelp } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Logo from "../Assets/logo.png";


const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Location",
      icon: <MdExplore />,
    },
    {
      text: "About Us",
      icon: <MdInfo />,
    },
    {
      text: "How It Works",
      icon: <MdOutlineHelp />,
    },
    {
      text: "Testimonial",
      icon: <MdModeComment />,
    },
    {
      text: "Login",
      icon: <FaCircleUser />,
    },
    {
      text: "Sign Up",
      icon: <BiSolidLogInCircle />,
    },
  ];

  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} width="200px" alt="" />
      </div>
      <div className="navbar-links-container">
        <a onClick={() => handleScroll('home')}>Home</a>
        <a onClick={() => handleScroll('locations')}>Locations</a>
        <a onClick={() => handleScroll('about-us')}>About Us</a>
        <a onClick={() => handleScroll('how-it-works')}>How It Works</a>
        <a onClick={() => handleScroll('testimonial')}>Testimonials</a>
        <a onClick={() => handleScroll('faq')}>FAQ</a>
        <Link to="/auth?mode=login">Login</Link>
        <button className="primary-button" onClick={() => navigate('/auth?mode=signup')}>Sign Up</button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;

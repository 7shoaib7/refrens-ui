import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Mui-components
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//css
import "./Navbar.css"
//assets
import rickAndMortyLogo from "../../assets/logo.png"



const Navbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [path, setPath] = useState('/')

    const handleDrawerToggle = (item) => {
        setDrawerOpen(!drawerOpen);
        setPath(item.link);
        navigate(item.link);
    };

    const handleNavigation = (item) => {
        setPath(item.link)
        navigate(item.link)
    }

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'Episodes', link: '/episodes' },
        { text: 'Location', link: '/locations' },
    ];

    return (
        <AppBar position="static" className="navbar">
            <div className="navbar-content">
                <div className="nav-logo">
                    <img src={rickAndMortyLogo} alt="rickAndMortyLogo" className='nav-logo-img' onClick={()=>navigate("/")}/>
                </div>
                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={handleDrawerToggle}
                            sx={{
                                width: '50%',
                                flexShrink: 0,
                                zIndex: theme.zIndex.drawer + 1,
                                '& .MuiDrawer-paper': {
                                  width: '50%',
                                },}}
                            PaperProps={{ sx: { width: '50%' } }}
                        >
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem key={item.text} onClick={() => handleDrawerToggle(item)} >
                                        <ListItemText primary={item.text} className="nav-drawer-list-menu-text" />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <div className="nav-list-menu-item">
                        {menuItems.map((item) => (
                            <Typography
                                key={item.text}
                                variant="body1"
                                className="nav-list-item-text"
                                onClick={() => handleNavigation(item)}
                                style={path !== null && path == item.link ? {
                                    color: "rgb(255, 152, 0)"
                                } : null}
                            >
                                {item.text}
                            </Typography>
                        ))}
                    </div>
                )}
            </div>
        </AppBar>
    );
};

export default Navbar;

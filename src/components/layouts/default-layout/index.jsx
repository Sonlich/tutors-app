import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {NavLink} from "react-router-dom";
import { users } from '../../../mockData.js'

function DefaultLayout() {
    const [isUserAuthorized, setIsUserAuthorized] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const user = users.find(user => user.id === 8);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setTimeout(() => {
            setIsUserAuthorized(false);
            handleCloseUserMenu();
        }, 1000);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: 'var(--secondary-dark-color)'}}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <CastForEducationIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1, ml: 6}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TutorMatch
                    </Typography>
                    {isUserAuthorized ? (
                        <Box sx={{ml: 'auto', mr: 6}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={user.firstName} src={user.photo} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {user.role === 'tutor' && (
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography color="inherit" textAlign="center" component={NavLink} to="/schedule"
                                                    sx={{textDecoration: 'none'}}>Schedule</Typography>
                                    </MenuItem>
                                )
                                }
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography color="inherit" textAlign="center" component={NavLink} to="/lessons"
                                                sx={{textDecoration: 'none'}}>Lessons</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography color="inherit" textAlign="center" component={NavLink} to="/profile"
                                                sx={{textDecoration: 'none'}}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography color="inherit" textAlign="center" component={NavLink} to="/"
                                                sx={{textDecoration: 'none'}}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ml: 'auto', mr: 6}}>
                            <Button color="inherit" component={NavLink} to="/login">Login</Button>
                            <Button color="inherit" component={NavLink} to="/signup">Sign up</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default DefaultLayout;
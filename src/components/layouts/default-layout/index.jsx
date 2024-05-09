import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

function DefaultLayout() {
    const [isUserAuthorized, setIsUserAuthorized] = React.useState();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'var(--secondary-dark-color)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CastForEducationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
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
                        <Box sx={{ ml: 'auto' }}>
                            <Button color="inherit" component={NavLink} to="/lessons">Lessons</Button>
                            <Button color="inherit" component={NavLink} to="/profile">Profile</Button>
                            <Button color="inherit" component={NavLink} to="/logout">Logout</Button>
                        </Box>
                    ) : (
                        <Box sx={{ ml: 'auto' }}>
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
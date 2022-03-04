import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";

import CssBaselineProps from "@mui/material/CssBaseline";
import {AppBar, Grid, Typography} from '@mui/material/';
import {ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import theme from "./mui/theme";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        margin: '5rem auto',
        padding: '1rem',
        justifyContent: 'center',
        textAlign: 'center'
    },
    appbar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItem: {
        textDecoration: 'none',
        fontWeight: 700,
        color: "inherit",
    }
})

function App() {
    const classes = useStyles();

    return (
        <>
            <CssBaselineProps/>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar color="secondary" className={classes.appbar}>
                        <Typography>
                            <Link className={classes.navItem} to="/">Home</Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.navItem} to="/login">Login</Link>
                        </Typography>

                    </AppBar>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;

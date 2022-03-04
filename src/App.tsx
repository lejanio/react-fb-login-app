import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";

import CssBaselineProps from "@mui/material/CssBaseline";
import {AppBar, Grid} from '@mui/material/';
import {ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import theme from "./theme";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        background: 'linear-gradient(45deg, #FE6BBB, #FF8E53)',
        border: 0,
        margin: '40px auto',
        color: '#FFFFFF',
        fontStyle: "italic",
    },
    appbar: {
        display: 'flex',
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
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
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

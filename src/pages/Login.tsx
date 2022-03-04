import React, {FormEvent, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import logo from '../assets/logo.png';

import theme from "../mui/theme";
import {Button, Grid, Paper, TextField} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";

type FormType = {
    email: string;
    password: string;
}

type FbResponseType = {
    status?: string;
    userID: string;
    name: string;
    email: string;
}

const useStyles = makeStyles({
    imageContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 'none',
        transform: 'rotate(90deg)',
    },
})

const Login = () => {
    const classes = useStyles();

    const [formValues, setFormValues] = useState<FormType>({email: '', password: ''})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fbResponse, setFbResponse] = useState<FbResponseType>({email: '', name: '', userID: ''})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formValues.email.trim() === '' || formValues.password.trim() === '') {
            return
        }

        alert('Success!')
        setFormValues({email: '', password: ''})
    }

    const componentClicked = () => {
        console.log('component clicked')
    }

    const responseFacebook = (response: FbResponseType) => {
        const {userID, name, email} = response;

        const newResponse = {userID, name, email}

        setFbResponse(newResponse)
        if (response.status === "unknown") {
            return
        }

        setIsLoggedIn(true);
    }

    let fbContent;

    if (isLoggedIn) {
        fbContent = null;
    } else {
        fbContent = (<FacebookLogin
            appId="1590322454681995"
            autoLoad={true}
            fields="name,email"
            onClick={componentClicked}
            callback={responseFacebook}/>);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {isLoggedIn ? (
                    <>
                        <Grid container direction="column">
                            <Grid item style={{fontWeight: '700'}}>Login successful!</Grid>
                            <Grid item>User: {fbResponse.name}</Grid>
                            <Grid item>Email: {fbResponse.email}</Grid>
                        </Grid>
                    </>) : (
                    <Grid container xs={12} lg={6} columnSpacing={{xs: 1, md: 3}} justifyContent="center">
                        < Grid item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Paper
                                className={classes.imageContainer}
                                elevation={0}
                                sx={{display: {xs: 'none', lg: 'flex'}}}
                            >
                                <img src={logo} alt="App logo" width="250px"/>
                            </Paper>
                        </Grid>
                        <Grid item container direction="column" rowSpacing={{xs: 1, md: 3}} marginTop={1} xs={12} lg={6}
                              justifyContent="center">
                            Please provide your e-mail and password to log in.
                            <form
                                onSubmit={(e) => handleSubmit(e)}>
                                <Grid item container direction="column" spacing={1.5} padding={1}>
                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            label="E-mail"
                                            size="small"
                                            placeholder="example@example.com"
                                            type="email"
                                            value={formValues.email}
                                            onChange={(e) => {
                                                const newFormValues = {...formValues, email: e.target.value}
                                                setFormValues(newFormValues)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            label="Password"
                                            size="small"
                                            type="password"
                                            value={formValues.password}
                                            onChange={(e) => {
                                                const newFormValues = {...formValues, password: e.target.value}
                                                setFormValues(newFormValues)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid item>
                                You can also log in using Facebook:
                                <div>{fbContent}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </ThemeProvider>
        </>
    );
};

export default Login;

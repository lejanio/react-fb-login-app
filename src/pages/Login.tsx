import React, {FormEvent, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import theme from "../theme";

import {Button, Grid, TextField} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';

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

const Login = () => {

    const [formValues, setFormValues] = useState<FormType>({email: "", password: ""})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fbResponse, setFbResponse] = useState<FbResponseType>({email: "", name: "", userID: ""})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formValues.email.trim() === '' || formValues.password.trim() === '') {
            return
        }

        alert('Success!')
        setFormValues({email: "", password: ""})

    }

    const componentClicked = () => {
        console.log('component clicked')
    }

    const responseFacebook = (response: FbResponseType) => {
        const {userID, name, email} = response;

        const newResponse = {userID, name, email}

        setFbResponse(newResponse)
        console.log(response)
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
            // @ts-ignore
            callback={responseFacebook}/>);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {isLoggedIn ? (
                    <>
                        <div>Login successful!</div>
                        <div>User: {fbResponse.name}</div>
                        <div>Email: {fbResponse.email}</div>
                    </>) : (
                    <Grid container direction="column" spacing={2} marginTop={1} justifyContent="center">
                        Please provide your e-mail and password to log in.
                        <form
                            onSubmit={(e) => handleSubmit(e)}>
                            <Grid item container direction="column" spacing={1} padding={1}>
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
                )}
            </ThemeProvider>
        </>
    );
};

export default Login;

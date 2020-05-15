import React from 'react';
import {Form, Label, Button} from 'reactstrap';

import "../css/Login.css"
import {useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";

import UserContext from "../Context/UserContext";


const Login = ({handleLogin, failedLogin}) => {
    const {register, handleSubmit, errors} = useForm();

    const body = (
        <div id="loginForm">
            <h2>Log in to Gelato Recipes</h2>
            {failedLogin && <div className="failed-login"><p>Incorrect username or password.</p></div>}
            <Form onSubmit={handleSubmit(handleLogin)}>
                <Label for="username">Username</Label>
                <input
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Enter username.."
                    ref={register({required: "Username required"})}
                />
                {errors.username && <p className="error">{errors.username.message}</p>}
                <Label for="password">Password</Label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password.."
                    ref={register({required: "Password required"})}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
                <Button type="submit">Log in</Button>
            </Form>
        </div>
    );

    return(
        <UserContext.Consumer>
            {user => (
                user.loggedIn
                ? <Redirect to='/'/>
                : body
            )}
        </UserContext.Consumer>
    )
};

export default Login;
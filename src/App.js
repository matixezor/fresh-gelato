import React, {useEffect, useState} from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from "./Components/Main";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import UserContext from "./Context/UserContext";
import axios from "axios";
import RecipeWrapper from "./Components/RecipeWrapper";

import mainImg from "./img/ice cream cone.webp";
import iceCreamIcon from "./img/ice cream icon 3.png";
import largeImg from "./img/ice_cream_desktop.jpg";
import mediumImg from "./img/ice_cream_desktop_600.jpg";


const App = () => {
    const[failedLogin, setFailedLogin] = useState(false);
    const[user, setUser] = useState({
        'name': '',
        'email': '',
        'loggedIn': sessionStorage.getItem('token') ? true : false
    });


    useEffect(() =>{
        const fetchUser = async () => {
            try{
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/current-user/', {
                        headers: {
                            Authorization: `JWT ${sessionStorage.getItem('token')}`
                        }
                    });
                setUser({
                    'name': res.data.username,
                    'email': res.data.username,
                    'loggedIn': true
                });
            } catch (e) {
                console.log(e);
            }
        };

        if(user.loggedIn)
            fetchUser();
    }, [user.loggedIn]);

    const handleLogin = (data, e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/token-auth/',{
            username: data.username,
            password: data.password
        }).then(function (res) {
            sessionStorage.setItem('token', res.data.token);
            setUser({
                'name': res.data.username,
                'email': res.data.username,
                'loggedIn': true
            });
        }).catch(function (error) {
            console.log(error);
            setFailedLogin(true);
        });
        e.target.reset();
    };

    const handleLogout = (e) => {
        sessionStorage.clear();
        setUser({
            'name': '',
            'email': '',
            'loggedIn': false
        })
    };
    return (
        <div id="container">
            <UserContext.Provider value={user}>
                <Router>
                    <Header handleLogout={handleLogout} />
                    <Switch>
                        <Route exact path="/" render={
                            () =>  <Main mainImg={mainImg} iceCreamIcon={iceCreamIcon} largeImg={largeImg} mediumImg={mediumImg} />
                        } />
                        <Route exact path="/recipes" component={RecipeWrapper} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/login" render={
                            () => <Login handleLogin={handleLogin} failedLogin={failedLogin} />
                        } />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </UserContext.Provider>
            <Footer />
        </div>
  );
};

export default App;

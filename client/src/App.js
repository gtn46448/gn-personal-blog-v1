import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import Form from './components/Form/Form.js';
import FullPost from './components/FullPost/FullPost.js';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <Switch>
                    <Route path ="/" exact component={Home} />
                    <Route path ="/auth" exact component={Auth} />
                    <Route path ="/create" component={Form} />
                    <Route path = "/post/:id" component={FullPost} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;
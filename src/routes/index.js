import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import ChatProvider from '../contexts/ChatContext';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Room from '../pages/Room';

const Routes = () => {
  const { authenticated } = useAuth();
  return (
    <Router>
      <Switch>
        {!authenticated && (
          <Route path="/" exact component={SignIn} />
        )}
        <ChatProvider>
          {authenticated && (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/room/:id" component={Room} />
            </>
          )}
        </ChatProvider>
      </Switch>
    </Router>
  )
}


export default Routes;

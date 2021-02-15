import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from '../MaterialUI';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { PageHome } from '../Components/PageHome';
import { PageAbout } from '../Components/PageAbout';
import { useStyles } from './styles';
import { SimpleMenu } from '../Components/SimpleMenu';
import { Layout } from '../Components/Layout';

export const AppEntry = () => {
  //------------------------>>>

  console.log('>>> ' + process.env.NODE_ENV);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Router basename={process.env.REACT_APP_BASE_HREF || '/'}>
            <Switch>
              <Route exact path="/">
                <PageHome />
              </Route>
              <Route path="/about">
                <PageAbout />
              </Route>
            </Switch>
            {/* <SimpleMenu /> */}
          </Router>
        </Layout>
      </ThemeProvider>
    </div>
  );
};

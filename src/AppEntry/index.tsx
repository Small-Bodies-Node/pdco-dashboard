import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from '../MaterialUI';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { PageHome } from '../Components/PageHome';
import { PageAbout } from '../Components/PageAbout';
import { useStyles } from './styles';
import { SimpleMenu } from '../Components/SimpleMenu';
import { Layout } from '../Components/Layout';
import { MyError } from '../Components/MyError';
import { ErrorBoundary } from 'react-error-boundary';
import { SidebarMenu } from '../Components/SidebarMenu';

const rootErrorMessage = `A an error occurred near the start/root of this web app -- please contact site admin!`;

export const AppEntry = () => {
  //------------------------>>>

  const classes = useStyles();
  return (
    <div className={'app-entry-container ' + classes.container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary fallbackRender={() => <MyError message={rootErrorMessage} />}>
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
              <SidebarMenu />
            </Router>
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};

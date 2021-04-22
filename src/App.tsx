import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { AppContextProvider } from 'context/';
import { Navbar, PrivateRoute, LazyLoader } from 'components/index';

import { privateRoutes, publicRoutes } from './routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token;
  const authInfo = localStorage.getItem('AUTH_INFO');
  if (authInfo) {
    token = JSON.parse(authInfo).token;
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppContextProvider>
          <Suspense fallback={<LazyLoader />}>
            {
              <>
                <Navbar />
                <main style={{ height: '100%' }}>
                  <Switch>
                    {privateRoutes.map((route, index) => (
                      <PrivateRoute
                        path={route.url}
                        component={route.component}
                        key={index}
                        exact={route.exact}
                      />
                    ))}
                  </Switch>
                  <Switch>
                    {publicRoutes.map((route, index) => (
                      <Route
                        path={route.url}
                        component={route.component}
                        key={index}
                        exact
                      />
                    ))}
                  </Switch>
                </main>
              </>
            }
          </Suspense>
        </AppContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

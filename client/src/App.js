import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

var httpLink = createHttpLink({ uri: '/graphql' });

var authLink = setContext((_, { headers }) => {

  let token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }};
  

});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache(), credentials: 'include' });

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={SearchBooks} />
          <Route path='/saved' element={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;

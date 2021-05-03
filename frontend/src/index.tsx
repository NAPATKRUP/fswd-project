import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { SessionProvider } from './context/SessionContext';
import Loading from './components/commons/loading/Loading';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Project: {
        fields: {
          members: {
            merge: false,
          },
        },
      },
    },
  }),
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SessionProvider>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </SessionProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

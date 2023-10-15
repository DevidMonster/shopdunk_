import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import './index.css'
import { client } from './api/instance.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
</BrowserRouter>
)

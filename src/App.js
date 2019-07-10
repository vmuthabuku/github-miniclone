import React, {Component} from 'react';
// import axios from "axios"
import './App.css';
import 'styled-components/macro'
import Login from './components/login'
import { createGlobalStyle } from 'styled-components';
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import {HttpLink} from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import SideBar from './components/sidebar'
import Column from './components/column'
const accessToken = localStorage.getItem('token');

const httpLink = new HttpLink({
  uri:"https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


// const accessToken = localStorage.getItem('token'); 
const Global = createGlobalStyle({
	body: {
		backgroundColor: '#fff',
		color: '#444',
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"',
		padding: 0,
		margin: 0,
		borderTop: '4px solid rgb(210, 54, 105)',
	},
	'*': {
		boxSizing: 'border-box',
	},
});

class App extends Component{
  render(){
    return (
      <>
      <Global />
      {
        accessToken ? (
          <ApolloProvider client={client}>
          <div
          css={{
              display: 'grid',
              gridTemplateColumns: '0.5fr 5fr 1fr',
              gridRowGap:'1ch',
              height: '100vh',
              overflow: 'hidden'
							}}
          >
            <SideBar/>
            <Column user="vmuthabuku"/>
            <p></p>          
          </div>
            
          </ApolloProvider>
         )      
        : ( <Login /> )
      }
      
       
      </>
    );

  }
 
}

export default App;

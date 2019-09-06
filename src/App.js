import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {ProductsList} from "./view/ProductsList";
import {Product} from "./view/ProductComponent";
import {Provider} from 'react-redux';
import {Store} from "./store";
import {Cart} from "./view/Cart";

function App() {
  return (
      <Provider store={Store}>
      <div id="main-app">
        <h1>Amazing Store</h1>
       <BrowserRouter>
         <Route exact path="/" component={ProductsList}/>
         <Route path="/product/:id" component={Product}/>
         <Route path="/cart" component={Cart}/>
       </BrowserRouter>
      </div>
      </Provider>
  );
}

export default App;

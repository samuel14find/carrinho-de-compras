import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {ProductsList} from "./view/ProductsList";
import {ProductComponent} from "./view/ProductComponent";

function App() {
  return (
    <div id="main-app">
      <h1>Amazing Store</h1>
     <BrowserRouter>
       <Route exact path="/" component={ProductsList}/>
       <Route path="/product/:id" component={ProductComponent}/>
     </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";
import { Route } from "react-router-dom";


import Landing from './Components/Landing'
import Home from './Components/Home'
import Detail from './Components/Detail'
import Form from './Components/Form'


function App() {
  return (
    <div className="App">
     
      <Route exact path='/' component={Landing } />
      <Route exact path='/home' component={Home} />
      <Route exact path='/detail/:id' component={Detail} />
      <Route exact path='/form' component={Form} />
      
    </div>
  );
}

export default App;

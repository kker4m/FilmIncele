import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import React from "react";
import RouterHolder from './components/RouterHolder'

const App = () => {
  return (
    <Router>
      <RouterHolder></RouterHolder>
    </Router>
  )
}

export default App;

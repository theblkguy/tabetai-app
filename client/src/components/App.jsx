import React from "react";
import { Routes, Route } from 'react-router-dom';
//make a homepage component
import HomePage from ''
//make a recipe page component
//perhaps make a profile page component

class App extends React.Component {
  constructor(props){
    super(props);
  }

//render the different routes to the page
render() {
  return (
    <div>
      <Route path="/" element={<HomePage />} />
    </div>
  )
}
}

export default App;
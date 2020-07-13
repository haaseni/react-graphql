import React, { Component } from 'react'
import Friends from './components/Friends'
import Friend from './components/Friend'
import Aliens from './components/Aliens'
//import { Aliens } from './data/dbConnectors'

class App extends Component {
  render() {
      return (
        <div className="App">
          <h1>All Friends:</h1>
          <Friends />
          <h1>Find a Friend:</h1>
          <Friend />
          <h1>All Aliens</h1>
          <Aliens />
        </div>
      )
  }
}

export default App

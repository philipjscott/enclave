import React from 'react'
import { Home } from './home'
import { Facewall } from './facewall'
import Shop from './shop'
import { HashRouter as Router, Route } from 'react-router-dom'

export function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/facewall/" component={Facewall} />
      <Route path="/shop/" component={Shop} />
    </Router>
  )
}

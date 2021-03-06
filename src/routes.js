import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CharacterList from './pages/characterList'
import CharacterProfile from './pages/characterProfile'
import Header from './components/Header'

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ CharacterList } />
        <Route exact path="/profile/:id" component={ CharacterProfile } />
      </Switch>
    </BrowserRouter>
  )
}


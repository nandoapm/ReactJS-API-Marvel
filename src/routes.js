import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CharacterList from './pages/characterList'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ CharacterList } />
      </Switch>
    </BrowserRouter>
  )
}

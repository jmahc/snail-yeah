import React, { Component } from 'react'

// import Button from '@/components/Button'
// import Icon from '@/components/Icon'

import Lifx from '@/containers/Lifx'

/*
  - Uncommenting the line below will break the linter.
  - However, if you do include it, you will notice that when building,
    `purifycss` removes any unused CSS.
 */
// import PurifiedCss from '@/containers/PurifiedCss'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lifx />
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'

import {
  // getIndividualLight,
  toggleAllLights,
  toggleGroupLights,
  toggleIndividualLights
} from '@/shared'

import './ToggleLightPower.css'

class ToggleLightPower extends Component {
  constructor(props) {
    super(props)

    this.state = {
      power: false
    }
  }
  clickHandler(lightGroup, lightIdentifier, toggleType) {
    console.log('ToggleLightPower clickHandler')
    switch (toggleType) {
      case 'All':
        console.log('Toggle All Lights')
        toggleAllLights()
        break
      case 'Individual':
        console.log(`Toggle Individual Light: ${lightIdentifier}`)
        toggleIndividualLights(lightIdentifier).then(response => {
          const data = response.data
          const results = data.results
          console.log('Individual shiz...')
          console.log(this.props)
          console.info(results)
          if (results[0].status === 'ok') {
            if (this.state.power) {
              this.setState({
                power: false
              })
            } else {
              this.setState({
                power: true
              })
            }
          }
        })
        break
      case 'Group':
        console.log(`Toggle Lights by Group: ${lightGroup}`)
        toggleGroupLights(lightGroup)
        break
      default:
        break
    }
  }

  componentWillMount() {
    console.log('Component will mount with:')
    console.info(this.props)
    this.setState({
      power: this.props.lightPower === 'on'
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('Next props for ToggleLightPower...')
    console.info(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should update:')
    console.info(this.props)
    console.info(this.state)
    console.info(nextProps)
    console.info(nextState)

    if (this.state.power !== nextState.power) {
      this.setState({
        power: nextState.power
      })
      return true
    }

    return false
  }

  matchResponseToLight() {}

  render() {
    const { lightGroup, lightId, lightLabel, toggleType } = this.props

    let cssButtonClass = 'Lifx-button'

    let cssDivClass =
      toggleType === 'Individual'
        ? 'Lifx-toggle--individual'
        : 'Lifx-toggle--multiple'

    if (this.state.power) {
      cssButtonClass += ' Lifx-button--green'
    }

    // if (lightIsConnected) {
    //   cssButtonClass += ' Lifx-button--connected'
    // }

    return (
      <div className={cssDivClass}>
        <label>Toggle power for:</label>
        <button
          className={cssButtonClass}
          onClick={() => this.clickHandler(lightGroup, lightId, toggleType)}
        >
          {lightLabel}
        </button>
      </div>
    )
  }
}

export default ToggleLightPower

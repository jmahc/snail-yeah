import React, { Component } from 'react'

import ToggleLightPower from '@/components/ToggleLightPower'

import { getLights } from '@/shared'

import './Lifx.css'

class Lifx extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: [],
      lights: []
    }
  }

  componentDidMount() {
    getLights().then(res => {
      console.log('Get lights response...')
      console.log(res)

      let uniqueGroups = {}
      const lights = res.data
      const groups = lights.map(item => item.group).filter((group, index) => {
        if (uniqueGroups[group.name]) {
          return false
        }
        uniqueGroups[group.name] = true
        return true
      })

      console.log('Groups...')
      console.log(groups)

      this.setState({
        groups,
        lights
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('Next props for Lifx Container...')
    console.info(nextProps)
  }

  render() {
    return (
      <div>
        <span className="Lifx-token-container">
          <p>Lifx token is {process.env.LIFX_TOKEN}</p>
        </span>
        <div className="Lifx-power-container">
          <div className="Lifx-power--all">
            <ToggleLightPower
              lightGroup={null}
              lightId={null}
              lightIsConnected={false}
              lightLabel={'All Lights'}
              lightPower={''}
              toggleType={'All'}
            />
          </div>
          {this.state.groups.map(group => {
            return (
              <div className="Lifx-power--group">
                <ToggleLightPower
                  lightGroup={group.id}
                  lightId={null}
                  lightIsConnected={false}
                  lightLabel={group.name}
                  lightPower={''}
                  toggleType={'Group'}
                />
              </div>
            )
          })}
          {this.state.lights.map((light, index) => {
            return (
              <ToggleLightPower
                key={index}
                lightGroup={null}
                lightId={light.id}
                lightIsConnected={light.connected}
                lightLabel={light.label}
                lightPower={light.power}
                toggleType={'Individual'}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Lifx

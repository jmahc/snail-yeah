import React, { Component } from 'react'
import axios from 'axios'

import './Lifx.css'

var axi = axios.create({
  baseURL: 'https://api.lifx.com/v1/',
  // timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.LIFX_TOKEN}`
  }
})

class Lifx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lights: []
    }
  }

  componentDidMount() {
    axi
      .get('/lights/all')
      .then(res => this.setState({ lights: res.data }))
      .catch(err => console.log(err))
  }

  handleOnClick(lightId) {
    axi.post(`/lights/id:${lightId}/toggle`)
    // axi.post('/lights/all/toggle')
  }

  render() {
    return (
      <div>
        <span className="Lifx-woohoo">
          Lifx token is {process.env.LIFX_TOKEN}
        </span>
        <div className="well">
          {this.state.lights.map(light => {
            return (
              <div>
                <label>Toggle power for:</label>
                <button onClick={() => this.handleOnClick(light.id)}>
                  {light.label}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Lifx

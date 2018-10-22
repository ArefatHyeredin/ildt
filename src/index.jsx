import React from 'react'
import ReactDOM from 'react-dom'
import { Rnd } from 'react-rnd'
import html2canvas from 'html2canvas'

import './style.scss'
import objectsList from './objectsList'

console.log('1')

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      objects: [
        { x: 350, y: 155, width: 300, name: 'table2' },
        { x: 430, y: 120, width: 90, name: 'imac' },
        { x: 490, y: 230, width: 90, name: 'keyboard' },
        { x: 534, y: 257, width: 120, name: 'officeChair2' }
      ],
      objectsList
    }
  }

  addImage (opts) {
    const objects = this.state.objects
    objects[objects.length] = { x: 10, y: 10, width: 100, name: opts.objectName }
    this.setState({ objects })
  }

  removeImage (opts) {
    const objects = this.state.objects
    delete objects[opts.key]
    this.setState({ objects })
  }

  saveImage () {
    html2canvas(document.getElementsByClassName('scene')[0]).then(function (canvas) {
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream')
      a.download = 'isometric.jpg'
      a.click()
    })
  }

  search (e) {
    const searchTerm = e.target.value

    let filteredResults = []

    if (searchTerm) {
      objectsList.map((object) => {
        if (object.toLowerCase().includes(searchTerm.toLowerCase())) {
          filteredResults.push(object)
        }
      })
    } else {
      filteredResults = objectsList
    }

    this.setState({
      objectsList: filteredResults
    })
  }

  render () {
    return (
      <div id='container'>
        <div id='objects'>
          <div id='searchWrapper'>
            <input type='text' id='search' placeholder='Search' onChange={this.search.bind(this)} />
          </div>

          <div id='list'>
            {
              this.state.objectsList.map((objectName, key) => {
                return (
                  <img
                    key={key}
                    alt={objectName}
                    title={objectName}
                    src={`objects/small/${objectName}.png`}
                    onClick={this.addImage.bind(this, { objectName })} />
                )
              })
            }
          </div>
        </div>

        <div id='scene'>
          {
            this.state.objects.map((object, key) => {
              return (
                <Rnd
                  key={key}
                  minWidth={10}
                  minHeight={10}
                  lockAspectRatio
                  default={{ x: object.x, y: object.y, width: object.width }}>
                  <img src={`objects/big/${object.name}.png`} alt={object.name} draggable='false' />

                  <div className='remove' onClick={this.removeImage.bind(this, { key })}>x</div>
                </Rnd>
              )
            })
          }

          <button id='saveImage' onClick={this.saveImage.bind(this)}>Save</button>
        </div>

        <div id='footer1'>
          Click on the objects you want to add to the scene from the left side.
          <br />
          Move/resize/remove your objects to make your design.
          <br />
          Hit the save button to save your image.
        </div>

        <div id='footer2'>
          Source of this tool: <a href='https://github.com/ozgrozer/ildt' target='_blank'>github.com/ozgrozer/ildt</a>
          <br />
          Original images: <a href='https://isometriclove.com/' target='_blank'>isometriclove.com</a>
          <br />
          Me: <a href='https://twitter.com/ozgrozer' target='_blank'>twitter.com/ozgrozer</a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

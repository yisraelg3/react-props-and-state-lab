import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    //console.log(event.target.value)
    this.setState({
      filters: {...this.state.filters,
        type: event.target.value}
    })
  }

  onFindPetsClick = () => {
    let filtersyntax = this.state.filters.type === 'all'? '':`?type=${this.state.filters.type}`
    fetch(`/api/pets${filtersyntax}`)
    .then(res => res.json())
    .then(petsArr => {
      this.setState({
      pets: petsArr
    })
   })
  }

  onAdoptPet = (id) => {
    let adoptedPetIndex = this.state.pets.findIndex(pet => pet.id === id)
    //console.log(adoptedPetIndex)
    const newPetsArr = [...this.state.pets]
    newPetsArr[adoptedPetIndex].isAdopted = true
    //console.log(newPetsArr)
    this.setState({
      pets: newPetsArr
    })
  }

  render() {
    //console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} type={this.state.filters.type} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './components/Homepage';
import GameRoom from './components/GameRoom';


class App extends Component {

  state = {
    yugisDeck: [],
    kaibasDeck: [],
    createGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false
  }

  componentDidMount() {

  }

  getYugisDeck = async () => {
    try {
      const res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Yugi')
      const cards = res.data.set.language_cards["English (na)"]
      cards.map(async (card) => {
        const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
        const deckCopy = [...this.state.yugisDeck]
        deckCopy.push(cardRes)
        this.setState({
          yugisDeck: deckCopy,
        })
      })
      this.yugiDeckBoolean()
    }
    catch (error) {
      console.error(error)
    }
  }

  yugiDeckBoolean = async () => {
    try {
      this.setState(prevState => ({
        yugiSelected: !prevState.yugiSelected
      }))
    }
    catch (error) {
      console.error(error)
    }
  }

  getKaibasDeck = async () => {
    try {
      const res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Kaiba')
      const cards = res.data.set.language_cards["English (na)"]
      cards.map(async (card) => {
        const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
        const deckCopy = [...this.state.kaibasDeck]
        deckCopy.push(cardRes)
        this.setState({
          kaibasDeck: deckCopy,
        })
      })
      this.kaibaDeckBoolean()
    }
    catch (error) {
      console.error(error)
    }
  }

  kaibaDeckBoolean = async () => {
    try {
      this.setState(prevState => ({
        kaibaSelected: !prevState.kaibaSelected
      }))
    }
    catch (error) {
      console.error(error)
    }
  }

  createGame = async () => {
    try {
      this.setState(prevState => ({
        createGamePressed: !prevState.createGamePressed
      }))
    }
    catch (error) {
      console.error(error)
    }
  }

  render() {

    const HomepageComponent = (props) => (
      <Homepage {...props}
        characterSelected={this.state.characterSelected}
        createGamePressed={this.state.createGamePressed}
        kaibaSelected={this.state.kaibaSelected}
        yugiSelected={this.state.yugiSelected}
        getKaibasDeck={() => this.getKaibasDeck()}
        getYugisDeck={() => this.getYugisDeck()}
        createGame={() => this.createGame()} />
    )
    
    const GameRoomComponent = (props) => (
      <GameRoom {...props} />
    )
    
    return (
      <div>
        <h1>app component</h1>
        <Router>

          <Switch>
            <Route exact path='/' render={HomepageComponent} />
            <Route exact path='/game' render={GameRoomComponent} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

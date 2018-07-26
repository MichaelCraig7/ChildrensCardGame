import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage';
import GameRoom from './components/GameRoom';


class App extends Component {

  state = {
    userDeck: [],
    createGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false
  }

  componentDidMount() {

  }

  createGame = () => {
    this.setState(prevState => ({
      createGamePressed: !prevState.createGamePressed
    }))
  }

  getYugisDeck = async () => {
    if (!this.state.yugiSelected && this.state.userDeck.length === 0) {
      try {
        const res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Yugi')
        const cards = res.data.set.language_cards["English (na)"]
        cards.map(async (card) => {
          const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          const deckCopy = [...this.state.userDeck]
          deckCopy.push(cardRes)
          this.setState({
            userDeck: deckCopy,
          })
        })
        this.yugiDeckBoolean()
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  yugiDeckBoolean = () => {
    this.setState(prevState => ({
      yugiSelected: !prevState.yugiSelected
    }))
  }

  getKaibasDeck = async () => {
    if (!this.state.kaibaSelected && this.state.userDeck.length === 0)
      try {
        const res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Kaiba')
        const cards = res.data.set.language_cards["English (na)"]
        cards.map(async (card) => {
          const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          const deckCopy = [...this.state.userDeck]
          deckCopy.push(cardRes)
          this.setState({
            userDeck: deckCopy,
          })
        })
        this.kaibaDeckBoolean()
      }
      catch (error) {
        console.error(error)
      }
  }

  kaibaDeckBoolean = () => {
    this.setState(prevState => ({
      kaibaSelected: !prevState.kaibaSelected
    }))
    this.toGameRoom()
  }

  toGameRoom = () => {
    if (this.state.createGamePressed) {
      this.setState({
        playerOne: true,
        redirect: true
      })
    }
    else if (!this.state.createGamePressed) {
      this.setState({
        playerTwo: true,
        redirect: true
      })
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

    if (this.state.redirect) {
      return <Router><Redirect push to="/gameroom" /></Router>;
    }

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

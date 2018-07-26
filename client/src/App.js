import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage';
import GameRoom from './components/GameRoom';


class App extends Component {

  state = {
    userDeck: [],
    createGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false,
    playerOne: false,
    playerTwo: false,
    redirectGameRoom: false
  }

  componentDidMount() {

  }

  createGame = () => {
    this.setState(prevState => ({
      createGamePressed: !prevState.createGamePressed
    }))
  }

  // getYugisDeck = async () => {
  //   if (!this.state.yugiSelected && this.state.userDeck.length === 0) {
  //     try {
  //       const res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Yugi')
  //       const cards = res.data.set.language_cards["English (na)"]
  //       cards.map(async (card) => {
  //         const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
  //         const deckCopy = [...this.state.userDeck]
  //         deckCopy.push(cardRes)
  //         this.setState({
  //           userDeck: deckCopy,
  //         })
  //       })
  //     }
  //     catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   this.yugiDeckBoolean()
  // }

  // yugiDeckBoolean = () => {
  //   this.setState(prevState => ({
  //     yugiSelected: !prevState.yugiSelected
  //   }))
  //   this.toGameRoom()
  // }

  getDeck = async (deckName) => {
    const userDeck = await this.fetchDeck(deckName)
    let yugiSelected = false
    let kaibaSelected = false
    if (deckName === 'Kaiba') {
      kaibaSelected = this.getKaibaDeckBoolean()
    } else if (deckName === 'Yugi') {
      yugiSelected = this.getYugiDeckBoolean()
    }
    const playerObject = this.toGameRoom()
    this.setState({
      userDeck,
      kaibaSelected,
      yugiSelected,
      playerOne: playerObject.playerOne,
      playerTwo: playerObject.playerTwo,
      redirectGameRoom: playerObject.redirectGameRoom
    })
  }

  fetchDeck = async (deckName) => {
    if (this.state.userDeck.length === 0) {
      let deck = []
      try {
        const res = await axios.get(`https://www.ygohub.com/api/set_info?name=Starter Deck: ${deckName}`)
        const cards = res.data.set.language_cards["English (na)"]
        console.log(cards)
        const deckPromise = cards.map(async (card) => {
          const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          console.log(cardRes.data)
          return cardRes.data
        })
        const resolved = await Promise.all(deckPromise)
        console.log(resolved)
        return resolved
      }
      catch (error) {
        console.error(error)
      }
    } else {
      return []
    }
  }

  getKaibaDeckBoolean = () => {
    return (!this.state.Selected)
  }

  getYugiDeckBoolean = () => {
    return !this.state.yugiSelected
  }

  toGameRoom = () => {
    const playerObject = {}
    if (this.state.createGamePressed) {
      // axios.post('/api/games')
      //   .then(res => {
      //     this.props.history.push('/gameroom', this.state)
      //   })
      playerObject.playerOne = true
      playerObject.playerTwo = false
      playerObject.redirectGameRoom = true
    } else if (!this.state.createGamePressed) {
      playerObject.playerOne = false
      playerObject.playerTwo = true
      playerObject.redirectGameRoom = true
    }
    return playerObject
  }

  challengeChecker = () => {
    this.setState({
      updateChallengersList: !this.state.updateChallengersList
    })
  }

  render() {

    const HomepageComponent = (props) => (
      <Homepage {...props}
        characterSelected={this.state.characterSelected}
        createGamePressed={this.state.createGamePressed}
        kaibaSelected={this.state.kaibaSelected}
        yugiSelected={this.state.yugiSelected}
        getDeck={this.getDeck}
        createGame={this.createGame}
        challengeChecker={this.challengeChecker}
      />
    )

    const GameRoomComponent = (props) => (
      <GameRoom {...props} />
    )

    return (
      <Router>
        <div>
          <h1>app component</h1>
          {this.state.redirectGameRoom ? <Redirect push to="/gameroom" /> : null}
          {this.state.redirectHomepage ? <Redirect push to="/" /> : null}

          <Switch>
            <Route exact path='/' render={HomepageComponent} />
            <Route path='/gameroom' render={GameRoomComponent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

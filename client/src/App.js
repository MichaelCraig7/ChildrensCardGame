import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage';
import GameRoom from './components/GameRoom';
import Challenges from './components/Challenges';


class App extends Component {

  state = {
    userDeck: [],
    createGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false,
    game: {},
    challengeList: [],
    gameRoom: {},
    playerOne: false,
    playerTwo: false,
    redirectGameRoom: false
  }

  componentDidMount() {
    this.challengeCreation()
  }

  createGame = () => {
    this.setState(prevState => ({
      createGamePressed: !prevState.createGamePressed
    }))
  }

  getDeck = async (deckName) => {
    const userDeck = await this.populateDeck(deckName)
    let yugiSelected = false
    let kaibaSelected = false
    if (deckName === 'Kaiba') {
      kaibaSelected = this.getKaibaDeckBoolean()
    } else if (deckName === 'Yugi') {
      yugiSelected = this.getYugiDeckBoolean()
    }
    const game = await this.gameCreation()
    const challengeList = await this.challengeCreation()
    // const gameRoom = await this.gameRoomCreation()
    const playerObject = await this.setPlayerAndRedirect()
    this.setState({
      userDeck,
      kaibaSelected,
      yugiSelected,
      game,
      challengeList,
      // gameRoom,
      playerOne: playerObject.playerOne,
      playerTwo: playerObject.playerTwo,
      redirectGameRoom: playerObject.redirectGameRoom
    })
  }

  populateDeck = async (deckName) => {
    if (this.state.userDeck.length === 0) {
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
    return (!this.state.kaibaSelected)
  }

  getYugiDeckBoolean = () => {
    return !this.state.yugiSelected
  }

  gameCreation = async () => {
    try {
      const createGame = await axios.post('/api/games')
      return createGame
    }
    catch (error) {
      console.error(error)
    }
  }

  challengeCreation = async () => {
    if (!this.state.createGamePressed) {
      try {
        const challengeList = await axios.get('/api/games')
        this.setState({
          challengeList: challengeList.data
        })
      }
      catch (error) {
        console.error(error)
      }
    } else {
      let challenges = []
      try {
        const getChallenges = await axios.get('/api/games')
        challenges.push(getChallenges)
        return challenges
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  // gameRoomCreation = async () => {
  //   try {
  //     const gameId = this.state.game.data.game.id
  //     const viewGame = await axios.get(`/api/games/${gameId}`)
  //     return viewGame
  //   }
  //   catch (error) {
  //     console.error(error)
  //   }
  // }

  setPlayerAndRedirect = () => {
    const playerObject = {}
    if (this.state.createGamePressed) {
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

    const ChallengesComponent = (props) => (
      <Challenges {...props} 
        challengeList={this.state.challengeList}  
      />
    )

    return (
      <Router>
        <div>
          <h1>app component</h1>
          {this.state.redirectGameRoom ? <Redirect push to={`/gameroom/${this.state.game.data.game.id}`} /> : null}
          {this.state.redirectHomepage ? <Redirect push to='/' /> : null}

          <Switch>
            <Route exact path='/' render={HomepageComponent} />
            <Route path='/challenges' render={ChallengesComponent} />
            <Route path='/gameroom/:id' render={GameRoomComponent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

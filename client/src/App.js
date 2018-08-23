import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage'
import GameRoom from './components/GameRoom'

class App extends Component {

  state = {
    userDeck: [],
    userDeck2: [],
    createGamePressed: false,
    acceptGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false,
    gameNumber: 0,
    gameId: 0,
    gameNum: 0,
    turn: '',
    game: {},
    challengeList: [],
    gameRoom: {},
    playerOne: false,
    playerTwo: false,
    p1Key: '',
    p2Key: '',
    p1LifePoints: 0,
    p2LifePoints: 0,
    p2Info: {},
    redirectGameRoom: false,
    p1Hand1: '',
    p1Hand2: '',
    p1Hand3: '',
    p1Hand4: '',
    p1Hand5: '',
    p1Hand6: '',
    p1Hand7: '',
    p2Hand1: '',
    p2Hand2: '',
    p2Hand3: '',
    p2Hand4: '',
    p2Hand5: '',
    p2Hand6: '',
    p2Hand7: ''
  }

  componentDidMount() {
    this.challengeCreation()
    setInterval(() => {
      this.challengeCreation()
    }, 2500)
  }

  createGame = () => {
    this.setState({
      createGamePressed: !this.state.createGamePressed,
      gameNum: this.state.challengeList.length
    })
  }

  acceptGame = (challengeId) => {
    this.setState({
      acceptGamePressed: !this.state.acceptGamePressed,
      gameId: challengeId
    })
  }

  getDeck = async (deckName) => {
    const userDeck = await this.populateDeck(deckName)
    const gameNumP1 = (this.state.challengeList.length + 1)
    const gameNumP2 = (this.state.challengeList.length)
    let yugiSelected = false
    let kaibaSelected = false
    if (deckName === 'Kaiba') {
      kaibaSelected = this.getKaibaDeckBoolean()
    } else if (deckName === 'Yugi') {
      yugiSelected = this.getYugiDeckBoolean()
    }
    if (this.state.createGamePressed) {
      const game = await this.gameCreation()
      const challengeList = await this.challengeCreation()
      const gameRoom = await this.gameRoomCreation()
      const playerObject = await this.setPlayerAndRedirect()
      this.setState({
        userDeck,
        gameNumP1,
        kaibaSelected,
        yugiSelected,
        game,
        challengeList,
        gameRoom,
        playerOne: playerObject.playerOne,
        playerTwo: playerObject.playerTwo,
        redirectGameRoom: playerObject.redirectGameRoom
      })
    } else if (this.state.acceptGamePressed) {
      const playerObject = await this.setPlayerAndRedirect()
      this.setState({
        userDeck2: userDeck,
        gameNumP2,
        kaibaSelected,
        yugiSelected,
        playerOne: playerObject.playerOne,
        playerTwo: playerObject.playerTwo,
        redirectGameRoomP2: playerObject.redirectGameRoomP2
      })
    }
  }

  populateDeck = async (deckName) => {
    if (this.state.userDeck.length === 0 || this.state.userDeck2.length === 0) {
      const res = await axios.get(`https://www.ygohub.com/api/set_info?name=Starter Deck: ${deckName}`)
      const cards = res.data.set.language_cards["English (na)"]
      const deckPromise = cards.map(async (card) => {
        const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
        if (cardRes.data.status !== "error") {
          return cardRes.data
        }
      })
      const resolved = await Promise.all(deckPromise)
      return resolved
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
    let id
    if (this.state.createGamePressed) {
      id = 2
    } else {
      id = 1
    }
    const createGame = await axios.post('/api/games/1/gamerooms', {
      user_id: id,
      p1_life_points: 4000,
      p2_life_points: 4000
    })
    return createGame
  }

  challengeCreation = async () => {
    if (!this.state.createGamePressed) {
      const challengeList = await axios.get('/api/games/1/gamerooms')
      this.setState({ challengeList: challengeList.data })
    } else {
      let challenges = []
      const getChallenges = await axios.get('/api/games/1/gamerooms')
      challenges.push(getChallenges)
      return challenges
    }
  }

  gameRoomCreation = async () => {
    const gameId = this.state.gameNum + 1
    const viewGame = await axios.get(`/api/games/1/gamerooms/${gameId}`)
    return viewGame
  }

  setPlayerAndRedirect = () => {
    const playerObject = {}
    if (this.state.createGamePressed) {
      playerObject.playerOne = true
      playerObject.playerTwo = false
      playerObject.redirectGameRoom = true
    } else if (!this.state.createGamePressed) {
      playerObject.playerOne = false
      playerObject.playerTwo = true
      playerObject.redirectGameRoomP2 = true
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
        acceptGamePressed={this.state.acceptGamePressed}
        kaibaSelected={this.state.kaibaSelected}
        yugiSelected={this.state.yugiSelected}
        challengeList={this.state.challengeList}
        getDeck={this.getDeck}
        createGame={this.createGame}
        challengeChecker={this.challengeChecker}
        acceptGame={this.acceptGame}
        p1Hand1={this.state.p1Hand1}
      />
    )

    const GameRoomComponent = (props) => (
      <GameRoom {...props}
        buttonTest={this.buttonTest}
        updateGameroom={this.updateGameroom}
        state={this.state}
      />
    )

    return (
      <Router>
        <div>
          {this.state.redirectGameRoom ? <Redirect push to={`/gameroom/${this.state.gameNum + 1}`} /> : null}
          {this.state.redirectGameRoomP2 ? <Redirect push to={`/gameroom/${this.state.gameId}`} /> : null}
          {this.state.redirectHomepage ? <Redirect push to='/' /> : null}
          <Switch>
            <Route exact path='/' render={HomepageComponent} />
            <Route path='/gameroom/:id' render={GameRoomComponent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

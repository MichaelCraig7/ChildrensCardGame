import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage'
import GameRoom from './components/GameRoom'

class App extends Component {

  state = {
    userDeck: [],
    createGamePressed: false,
    acceptGamePressed: false,
    kaibaSelected: false,
    yugiSelected: false,
    gameNumber: 0,
    gameId: 0,
    gameNum: 0,
    game: {},
    challengeList: [],
    gameRoom: {},
    playerOne: false,
    playerTwo: false,
    p1LifePoints: 4000,
    p2LifePoints: 4000,
    p2Info: {},
    redirectGameRoom: false,
    p1Hand1: '',
    p1Hand2: '',
    p1Hand3: '',
    p2Hand1: '',
    p2Hand2: '',
    p2Hand3: ''
  }

  componentDidMount() {
    this.challengeCreation()
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
        userDeck,
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
    if (this.state.userDeck.length === 0) {
      try {
        const res = await axios.get(`https://www.ygohub.com/api/set_info?name=Starter Deck: ${deckName}`)
        const cards = res.data.set.language_cards["English (na)"]
        const deckPromise = cards.map(async (card) => {
          const cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          return cardRes.data
        })
        const resolved = await Promise.all(deckPromise)
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
    let id
    if (this.state.createGamePressed) {
      id = 2
    } else {
      id = 1
    }
    try {
      const createGame = await axios.post('/api/games/1/gamerooms', {
        user_id: id,
        p1_life_points: 4000
      })
      return createGame
    }
    catch (error) {
      console.error(error)
    }
  }

  challengeCreation = async () => {
    if (!this.state.createGamePressed) {
      try {
        const challengeList = await axios.get('/api/games/1/gamerooms')
        this.setState({ challengeList: challengeList.data })
      }
      catch (error) {
        console.error(error)
      }
    } else {
      let challenges = []
      try {
        const getChallenges = await axios.get('/api/games/1/gamerooms')
        challenges.push(getChallenges)
        return challenges
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  gameRoomCreation = async () => {
    try {
      const gameId = this.state.gameNum + 1
      const viewGame = await axios.get(`/api/games/1/gamerooms/${gameId}`)
      return viewGame
    }
    catch (error) {
      console.error(error)
    }
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

  updateGameroom = async () => {
    try {
      const cards = this.state.userDeck
      const card = await cards[Math.floor(Math.random() * cards.length)]
      const cardImage = card.card.image_path
      console.log(card);
      
      if (this.state.playerOne) {
        if (!this.state.p1Hand1) {
          this.setState({ p1Hand1: card })
          let payload = { ...this.state }
          payload.p1_hand_1 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameNum + 1}`, payload)
          return update

        } else if (!this.state.p1Hand2) {
          this.setState({ p1Hand2: card })
          let payload = { ...this.state }
          payload.p1_hand_2 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameNum + 1}`, payload)
          return update
        } else if (!this.state.p1Hand3) {
          this.setState({ p1Hand3: card })
          let payload = { ...this.state }
          payload.p1_hand_3 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameNum + 1}`, payload)
          return update
        }
      } else if (this.state.playerTwo) {
        if (!this.state.p2Hand1) {
          this.setState({ p2Hand1: card })
          let payload = { ...this.state }
          payload.p2_hand_1 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameId}`, payload)
          return update
        } else if (!this.state.p2Hand2) {
          this.setState({ p2Hand2: card })
          let payload = { ...this.state }
          payload.p2_hand_2 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameId}`, payload)
          return update
        } else if (!this.state.p2Hand3) {
          this.setState({ p2Hand3: card })
          let payload = { ...this.state }
          payload.p2_hand_3 = cardImage
          const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameId}`, payload)
          return update
        }
        //   this.setState({
        //     p2Hand1: card.image_path
        //   })
        //   let p2_hand_1_object = {
        //     p2_hand_1: this.state.p2Hand1
        //   }
        //   const update = await axios.patch(`/api/games/1/gamerooms/${this.state.gameId}`, p2_hand_1_object)
        //   console.log(update)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  populateHand = () => {

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

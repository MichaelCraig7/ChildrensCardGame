import React, { Component } from 'react'
import axios from 'axios'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './components/Homepage';
import GameRoom from './components/GameRoom';


class App extends Component {

  state = {
    yugisDeck: [],
    kaibasDeck: []
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
          yugisDeck: deckCopy
        })
      })
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
          kaibasDeck: deckCopy
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  render() {

    const HomepageComponent = (props) => (
      <Homepage {...props}
        getKaibasDeck={() => this.getKaibasDeck()}
        getYugisDeck={() => this.getYugisDeck()} />
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

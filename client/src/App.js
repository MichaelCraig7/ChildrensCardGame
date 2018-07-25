import React, { Component } from 'react'
import axios from 'axios'


class App extends Component {

  state = {
    cardInfo: {},
    yugisDeck: [],
    kaibasDeck: []
  }

  componentDidMount() {
    this.getKaibasDeck()
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

  getCard = async (cardName) => {
    try {
      const cardsResponse = await axios.get('https://www.ygohub.com/api/all_cards')
      this.setState({
        cardInfo: cardsResponse.data
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <h1>app component</h1>
      </div>
    )
  }
}

export default App

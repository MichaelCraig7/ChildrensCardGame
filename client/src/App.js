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
      let res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Yugi')
      let cards = res.data.set.language_cards["English (na)"]
        cards.map( async (card) => {
          let cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          console.log(cardRes)
            this.setState({
              yugisDeck: cardRes
          })
        })
      }
    catch (error) {
      console.error(error)
    }
  }

  getKaibasDeck = async () => {
    try {
      let res = await axios.get('https://www.ygohub.com/api/set_info?name=Starter Deck: Kaiba')
      let cards = res.data.set.language_cards["English (na)"]
        cards.map( async (card) => {
          let cardRes = await axios.get(`https://www.ygohub.com/api/card_info?name=${card.card_name}`)
          console.log(cardRes)
            this.setState({
              KaibasDeck: cardRes
          })
        })
      }
    catch (error) {
      console.error(error)
    }
  }

  getCard = async (cardName) => {
    try {
      let cardsResponse = await axios.get('https://www.ygohub.com/api/all_cards')
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

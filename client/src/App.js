import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {

  state = {
    cardInfo: {},
    yugiDeck: {},
    kaibaDeck: {}
  }

  componentDidMount() {

  }

  getAllCards = async () => {
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

  getCard = async (cardName) => {
    try {
      let cardsResponse = await axios.get(`https://www.ygohub.com/api/card_info?name=${cardName}`)
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
    );
  }
}

export default App;

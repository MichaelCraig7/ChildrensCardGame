import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {

  componentDidMount() {
    this.getCardInfo()
  }

  getCardInfo = async () => {
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
      <div className="App">
        <h1>app component</h1>
      </div>
    );
  }
}

export default App;

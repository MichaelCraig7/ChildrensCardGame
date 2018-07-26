import React, { Component } from 'react'
import { } from 'react-router-dom'

class Homepage extends Component {

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                {this.props.createGamePressed
                    ?
                    <div>
                        <button onClick={() => this.props.getDeck('Kaiba')}>Kaiba</button>
                        <button onClick={() => this.props.getDeck('Yugi')}>Yugi</button>
                    </div>
                    :
                    <button onClick={() => this.props.createGame()}>Create Game</button>
                }
                <button onClick={() => this.props.challengeChecker()}>Challengers</button>
            </div>
        );
    }
}

export default Homepage;
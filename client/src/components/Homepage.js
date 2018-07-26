import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Homepage extends Component {

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                {this.props.createGamePressed
                    ?
                    <div>
                        <button onClick={() => this.props.getKaibasDeck()}>Kaiba</button>
                        <button onClick={() => this.props.getYugisDeck()}>Yugi</button>
                    </div>
                    :
                    <button onClick={() => this.props.createGame()}>Create Game</button>
                }
            </div>
        );
    }
}

export default Homepage;
import React, { Component } from 'react'
import { } from 'react-router-dom'

class Homepage extends Component {

    render() {

        const x = this.props
        
        return (
            <div>
                <h1>Homepage</h1>
                <button onClick={() => x.challengeChecker()}>Challenges</button>
                {x.createGamePressed
                    ?
                    <div>
                        <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                        <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                    </div>
                    :
                    <button onClick={() => x.createGame()}>Create Game</button>
                }
                {/* {x.userDeck === 0
                    ?
                    :
                    null
                } */}
            </div >
        );
    }
}

export default Homepage;
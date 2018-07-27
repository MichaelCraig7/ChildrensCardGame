import React, { Component } from 'react'
import { } from 'react-router-dom'
import Challenges from './Challenges'

class Homepage extends Component {

    render() {

        const x = this.props

        return (
            <div>
                <h1>Homepage</h1>
                <button onClick={() => x.challengeChecker()}>Challenges</button>
                <Challenges
                    challengeList={this.props.challengeList}
                    acceptGame={this.props.acceptGame}
                />
                {x.createGamePressed
                    ?
                    <div>
                        <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                        <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                    </div>
                    :
                    <button onClick={() => x.createGame()}>Create Game</button>
                }
                {x.acceptGamePressed
                    ?
                    <div>
                        <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                        <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                    </div>
                    :
                    null
                }
                {/* {x.userDeck === 0 && x.game
                    ?
                    <button onClick={() => x.issueChallenge()}>Issue Challenge</button>
                    :
                    null
                } */}
            </div >
        );
    }
}

export default Homepage
import React, { Component } from 'react'
import { } from 'react-router-dom'
import Challenges from './Challenges'
import styled from 'styled-components'

const HomepageWrapper = styled.div`
    display: grid;
    grid-template: repeat(4, 25vh) / repeat(12, 1fr);
`

const CharacterSelect = styled.div`

`

const CreateGameAndLoop = styled.div`
    .createGameBtn {
        grid-area: 3 / 5 / span 1 / span 4;
        background: indianred;
        border-radius: 5px;
    }
    div {
        grid-area: 2 / 4 / span 2 / span 4;
    }
`

class Homepage extends Component {

    render() {

        const x = this.props

        return (
            <HomepageWrapper>
                <div>
                    {x.createGamePressed
                        ?
                        <CharacterSelect>
                            <h1>Choose a character</h1>
                            <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                            <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                        </CharacterSelect>
                        :
                        <CreateGameAndLoop>
                            <div>
                                <h1>Challengers</h1>
                                <Challenges
                                    challengeList={this.props.challengeList}
                                    acceptGame={this.props.acceptGame}
                                />
                                <button onClick={() => x.challengeChecker()}>Update Challenges</button>
                            </div>
                            <div>
                                <button className='createGameBtn' onClick={() => x.createGame()}>Create Game</button>
                            </div>
                        </CreateGameAndLoop>
                    }
                </div>

                <div>
                    {x.acceptGamePressed
                        ?
                        <CharacterSelect>
                            <h1>Choose a character</h1>
                            <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                            <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                        </CharacterSelect>
                        :
                        null
                    }
                </div>
            </HomepageWrapper>
        );
    }
}

export default Homepage
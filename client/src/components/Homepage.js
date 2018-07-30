import React, { Component } from 'react'
import { } from 'react-router-dom'
import Challenges from './Challenges'
import styled from 'styled-components'

const HomepageWrapper = styled.div`
    background: rgb(216, 216, 216);

`

const CharacterSelect = styled.div`

`

const CreateGameAndLoop = styled.div`
    display: flex;
    display: grid;
    grid-template: repeat(2, 48vh) / repeat(8, 1fr);
    grid-gap: 2vw;
    div {
        grid-area: 1 / 3 / span 1 / span 4;
        display: inline-block;
        align-self: center;
        text-align: center;
    }
    .createGame button{
        background: indianred;
        border-radius: 5px;
        font-size: -webkit-xxx-large;
        box-shadow: 1.5px 3px #888888;
    }
    .createGame {
        grid-area: 2 / 4 / span 2 / span 2;
        align-self: center;
        text-align: center;
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
                            <div className='challengeBtns'>
                                <Challenges
                                    challengeList={this.props.challengeList}
                                    acceptGame={this.props.acceptGame}
                                />
                            </div>
                                <button onClick={() => x.challengeChecker()}>Update Challenges</button>
                            <div className='createGame'>
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
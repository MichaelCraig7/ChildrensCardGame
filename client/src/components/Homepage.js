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
    display: grid;
    grid-template: 6vh 43vh 5vh 43vh 3vh / repeat(3, 1fr) 1vw 1fr 1fr 1vw repeat(3, 1fr);
    /* grid-gap: 2vw; */
    div {
        grid-area: 2 / 2 / span 1 / span 8;
        display: inline-block;
        align-self: center;
        text-align: center;
    }
    .challengeBtns {
        background: #f1f1f1
    }
    .challengeBtns button{
        background: #f1f1f1;
        border: none;
        outline: none;
    }
    .createGame {
        grid-area: 3 / 5 / span 2 / span 2;
        align-self: center;
        text-align: center;
        background: #f1f1f1;
    }
    .createGame button{
        background: #f1f1f1;
        outline: none;
        border: none;
        font-size: -webkit-xxx-large;
    }
`

const LeftBox = styled.div`
    grid-area: 4 / 2 / span 1 / span 2;
`

const RightBox = styled.div`
    grid-area: 4 / 6 / span 1 / span 2;
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
                                <button onClick={() => x.challengeChecker()}>Update Challenges</button>
                            </div>
                            <div className='createGame'>
                                <button className='createGameBtn' onClick={() => x.createGame()}>Create Game</button>
                            </div>
                        </CreateGameAndLoop>
                    }
                </div>

                <LeftBox><h1>sdasda</h1></LeftBox>

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

                <RightBox>greasga</RightBox>
            </HomepageWrapper>
        );
    }
}

export default Homepage
import React, { Component } from 'react'
import { } from 'react-router-dom'
import Challenges from './Challenges'
import styled from 'styled-components'

const HomepageWrapper = styled.div`
    background: rgb(216, 216, 216);
    display: grid;
    grid-gap: 2vw;
    grid-template-areas:
    'body1 body1 body1 body1 body1'
    'body2 body2 body2 body2 body2'
    'body3 body3 body3 body3 body3'
    'body4 body4 body4 body4 body4';
`

const CharacterSelect = styled.div`

`

const CreateGameAndLoop = styled.div`
    grid-area: body2;
    .challengeBtns {
        background: #f1f1f1
    }
    .challengeBtns button{
        background: #f1f1f1;
        border: none;
        outline: none;
    }
    .createGame {
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
    grid-area: body4;
`

const RightBox = styled.div`
    grid-area: body3;
`

class Homepage extends Component {

    render() {

        const x = this.props

        return (
            <HomepageWrapper>
                <CreateGameAndLoop>
                    {x.createGamePressed
                        ?
                        <CharacterSelect>
                            <h1>Choose a character</h1>
                            <button onClick={() => x.getDeck('Kaiba')}>Kaiba</button>
                            <button onClick={() => x.getDeck('Yugi')}>Yugi</button>
                        </CharacterSelect>
                        :
                        <div>
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
                        </div>
                    }
                </CreateGameAndLoop>

                <LeftBox><h1></h1></LeftBox>

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

                <RightBox></RightBox>
            </HomepageWrapper>
        );
    }
}

export default Homepage
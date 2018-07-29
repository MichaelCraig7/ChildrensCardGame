import React, { Component } from 'react'
import styled from 'styled-components'

const ChallengesWrapper = styled.div`

`

class Challenges extends Component {
    
    render() {

        const challengeLoop = this.props.challengeList.map(challenge => {
            return (
                <div key={challenge.id}>
                    <button onClick={() => this.props.acceptGame(challenge.id)}>Game {challenge.id}</button>
                </div>
            )
        })

        return (
            <ChallengesWrapper>
                <div>{challengeLoop}</div>
            </ChallengesWrapper>
        );
    }
}

export default Challenges
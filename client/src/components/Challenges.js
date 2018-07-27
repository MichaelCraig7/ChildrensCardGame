import React, { Component } from 'react'

class Challenges extends Component {
    
    acceptGame = () => {
        console.log('hello')
        this.props.acceptGame()
    }
    
    render() {

        console.log(this)
        


        const challengeLoop = this.props.challengeList.map(challenge => {
            return (
                <div key={challenge.id}>
                    <button onClick={this.acceptGame}>{challenge.id}</button>
                </div>
            )
        })

        return (
            <div>
                <div>Challenge Mapper</div>
                <div>{challengeLoop}</div>
            </div>
        );
    }
}

export default Challenges
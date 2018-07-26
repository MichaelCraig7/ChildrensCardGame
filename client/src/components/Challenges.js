import React, { Component } from 'react'

class Challenges extends Component {
    render() {

        console.log(this)

        const challengeLoop = this.props.challengeList.map(challenge => {
            return (
                <div key={challenge.id}>
                    <button onClick={() => this.props.acceptGame()}>{challenge.id}</button>
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
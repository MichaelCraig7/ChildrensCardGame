import React, { Component } from 'react'



class GameRoom extends Component {
    render() {

        {if (this.props.state.playerOne && this.props.state.p1Hand1) {
            return (
                <img src={this.props.state.p1Hand1.card.image_path} alt='img' />
            )
        }}
        {if (this.props.state.playerTwo && this.props.state.p2Hand1) {
            return (
                <img src={this.props.state.p2Hand1.card.image_path} alt='img' />
            )
        }}
        return (
            <div>
                <h1>GameRoom</h1>

                <button onClick={() => this.props.updateGameroom()}>Draw</button>

            </div>
        );
    }
}

export default GameRoom
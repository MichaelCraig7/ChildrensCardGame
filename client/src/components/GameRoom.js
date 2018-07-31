import React, { Component } from 'react'



class GameRoom extends Component {

    p1Card1 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand1) {
            return (
                <div>
                    <img src={this.props.state.p1Hand1.card.image_path} alt='img' />
                </div>
            )
        } 
    }

    p1Card2 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand2) {
            return (
                <div>
                    <img src={this.props.state.p1Hand2.card.image_path} alt='img' />
                </div>
            )
        }
    }

    p2Card1 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand1) {
            return (
                <div>
                    <img src={this.props.state.p2Hand1.card.image_path} alt='img' />
                </div>
            )
        }
    }

    rerender = () => {
        this.forceUpdate()
    }

    render() {

        return (
            <div>
                <h1>GameRoom</h1>

                <button onClick={() => this.props.updateGameroom()}>Draw</button>
                <button onClick={() => this.rerender()}>rerender</button>
                {this.p1Card1()}
                {this.p1Card2()}
                {this.p2Card1()}
            </div>
        );
    }
}


export default GameRoom
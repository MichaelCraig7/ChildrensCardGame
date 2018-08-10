import React, { Component } from 'react'
import axios from 'axios'


class GameRoom extends Component {

    componentDidMount() {
        this.getGameRoomData()
        this.populateBoard()
    }

    populateBoard = () => {

    }

    getGameRoomData = async () => {
        if (this.props.state.playerOne) {
            const games = await axios.get('/api/games/1/gamerooms')
            const gameNum = this.props.state.gameNum + 1
            const game = games.data[gameNum]
            console.log(games)
        } else if (this.props.state.playerTwo) {
            const games = await axios.get('/api/games/1/gamerooms')
            const gameNum = this.props.state.gameId
            const game = games.data[gameNum]
            console.log(games)
        }
    }

    p1Card1 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand1) {
            return (<img src={this.props.state.p1Hand1.card.image_path} alt='img' />)
        }
    }

    p1Card2 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand2) {
            return (<img src={this.props.state.p1Hand2.card.image_path} alt='img' />)
        }
    }

    p1Card3 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand3) {
            return (<img src={this.props.state.p1Hand3.card.image_path} alt='img' />)
        }
    }

    p2Card1 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand1) {
            return (<img src={this.props.state.p2Hand1.card.image_path} alt='img' />)
        }
    }

    p2Card2 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand2) {
            return (<img src={this.props.state.p2Hand2.card.image_path} alt='img' />)
        }
    }

    p2Card3 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand3) {
            return (<img src={this.props.state.p2Hand3.card.image_path} alt='img' />)
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
                <div>{this.p1Card1()}</div>
                <div>{this.p1Card2()}</div>
                <div>{this.p1Card3()}</div>
                <div>{this.p2Card1()}</div>
                <div>{this.p2Card2()}</div>
                <div>{this.p2Card3()}</div>
            </div>
        );
    }
}


export default GameRoom
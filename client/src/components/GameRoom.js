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
        const x = this.props.state
        if (x.playerOne) {
            const gameId = x.gameNum + 1
            const game = await axios.get(`/api/games/1/gamerooms/${gameId}`)
            // const game = games.data.find(game => game.id === (x.gameNum + 1))
            console.log(game.data.p1_hand_1)
            this.setState({
                p1Hand1: game.data.p1_hand_1,
                p1Hand2: game.data.p1_hand_2,
                p1Hand3: game.data.p1_hand_3,
                p2Hand1: game.data.p2_hand_1,
                p2Hand2: game.data.p2_hand_2,
                p2Hand3: game.data.p2_hand_3
            })
        } else if (x.playerTwo) {
            const gameId = x.gameId
            const game = await axios.get(`/api/games/1/gamerooms/${gameId}`)
            // const game = games.data.find(game => game.id === (x.gameId))
            console.log(game)
            this.setState({
                p1Hand1: game.p1_hand_1,
                p1Hand2: game.p1_hand_2,
                p1Hand3: game.p1_hand_3,
                p2Hand1: game.p2_hand_1,
                p2Hand2: game.p2_hand_2,
                p2Hand3: game.p2_hand_3
            })
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
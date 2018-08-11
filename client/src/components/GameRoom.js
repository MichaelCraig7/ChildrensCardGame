import React, { Component } from 'react'
import axios from 'axios'


class GameRoom extends Component {

    componentDidMount() {
        // this.getGameRoomData()
        this.populateBoard()
    }

    populateBoard = async () => {
        // const roomNum = this.roomNumber()
        //use path name
        const game = await axios.get('/api/games/1/gamerooms/18')
        console.log(game)
        const d = game.data
        // if (this.props != undefined) {
            if (this.props.state.playerOne || this.props.state.playerTwo) {
                this.setState({
                    roomNum: d.id,
                    p1LifePoints: d.p1_life_points,
                    p2LifePoints: d.p2_life_points,
                    p1Deck: this.props.state.userDeck,
                    // p2Deck,
                    p1Hand1: d.p1_hand_1,
                    p1Hand2: d.p1_hand_2,
                    p1Hand3: d.p1_hand_3,
                    p2Hand1: d.p2_hand_1,
                    p2Hand2: d.p2_hand_2,
                    p2Hand3: d.p2_hand_3
                })
                console.log('hitFirst', this.state);
            }
        // } else if (this.props != undefined) {
           else if (!this.props.state.playerOne || !this.props.state.playerTwo) {
                this.setState({
                    roomNum: d.id,
                    p1LifePoints: d.p1_life_points,
                    p2LifePoints: d.p2_life_points,
                    // p1Deck: this.props.state.userDeck,
                    // p2Deck,
                    p1Hand1: d.p1_hand_1,
                    p1Hand2: d.p1_hand_2,
                    p1Hand3: d.p1_hand_3,
                    p2Hand1: d.p2_hand_1,
                    p2Hand2: d.p2_hand_2,
                    p2Hand3: d.p2_hand_3
                })
                console.log('hit2', this.state);
            // }
        }
    }

    roomNumber = () => {

    }

    getGameRoomData = async () => {
        const x = this.props.state
        // const roomNum  
        // const game = await axios.get(`/api/games/1/gamerooms/${this.props.state.gameNumP1}`)
        const game = await axios.get('/api/games/1/gamerooms/3')
        const gameIdP1 = x.gameNum + 1
        const gameIdP2 = x.gameId
        if (!x.playerOne && !x.playerTwo) {



        } else if (x.playerOne) {
            const game = await axios.get(`/api/games/1/gamerooms/${gameIdP1}`)
            console.log(game.data.p1_hand_1)
            this.setState({
                gameNumber: game.data.room,
                p1Hand1: game.data.p1_hand_1,
                p1Hand2: game.data.p1_hand_2,
                p1Hand3: game.data.p1_hand_3,
                p2Hand1: game.data.p2_hand_1,
                p2Hand2: game.data.p2_hand_2,
                p2Hand3: game.data.p2_hand_3
            })
        } else if (x.playerTwo) {
            const game = await axios.get(`/api/games/1/gamerooms/${gameIdP2}`)
            console.log(game)
            this.setState({
                gameNumber: game.data.room,
                p1Hand1: game.data.p1_hand_1,
                p1Hand2: game.data.p1_hand_2,
                p1Hand3: game.data.p1_hand_3,
                p2Hand1: game.data.p2_hand_1,
                p2Hand2: game.data.p2_hand_2,
                p2Hand3: game.data.p2_hand_3
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
                {/* <div><img src={this.props.state.p1Hand1} alt=''/></div> */}
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
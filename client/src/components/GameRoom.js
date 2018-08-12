import React, { Component } from 'react'
import axios from 'axios'


class GameRoom extends Component {

    state = {

    }

    componentDidMount() {
        this.populateBoard()
    }

    populateBoard = async () => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.props.state
        const y = game.data
        if (this.props.location.key === y.p1) {
            // set p1DeckState to p1's deck in db
        }
        if (this.props.location.key === y.p2) {
            // set p2DeckState to p2's deck in db
        }
        if (this.props.state.playerOne || this.props.state.playerTwo) {
            const p1Key = this.getP1Key()
            const p2Key = this.getP2Key()
            const p1Deck = this.getP1Deck()
            let payload = { ...this.state }
            console.log(p1Deck)
            if (p1Key) {
                payload.p1 = p1Key
                p1Deck.map(card => {
                    if (card) {
                        console.log(card.card.image_path)
                        console.log(card);
                        
                        payload.p1_deck_1 = card.card.image_path
                        console.log(payload)
                    }
                })
            }
            if (p2Key) {
                payload.p2 = p2Key
            }
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            console.log('upd', update)
            this.setState({
                roomNum: y.id,
                p1: p1Key,
                p2: p2Key,
                p1LifePoints: y.p1_life_points,
                p2LifePoints: y.p2_life_points,
                p1Deck: x.userDeck,
                p2Deck: x.userDeck2,
                p1Hand1: y.p1_hand_1,
                p1Hand2: y.p1_hand_2,
                p1Hand3: y.p1_hand_3,
                p1Hand4: y.p1_hand_4,
                p1Hand5: y.p1_hand_5,
                p1Hand6: y.p1_hand_6,
                p1Hand7: y.p1_hand_7,
                p2Hand1: y.p2_hand_1,
                p2Hand2: y.p2_hand_2,
                p2Hand3: y.p2_hand_3,
                p2Hand4: y.p2_hand_4,
                p2Hand5: y.p2_hand_5,
                p2Hand6: y.p2_hand_6,
                p2Hand7: y.p2_hand_7
            })
        } else {
            this.setState({
                roomNum: y.id,
                p1: y.p1,
                p2: y.p2,
                p1LifePoints: y.p1_life_points,
                p2LifePoints: y.p2_life_points,
                p1Deck: x.userDeck,
                p2Deck: x.userDeck2,
                p1Hand1: y.p1_hand_1,
                p1Hand2: y.p1_hand_2,
                p1Hand3: y.p1_hand_3,
                p1Hand4: y.p1_hand_4,
                p1Hand5: y.p1_hand_5,
                p1Hand6: y.p1_hand_6,
                p1Hand7: y.p1_hand_7,
                p2Hand1: y.p2_hand_1,
                p2Hand2: y.p2_hand_2,
                p2Hand3: y.p2_hand_3,
                p2Hand4: y.p2_hand_4,
                p2Hand5: y.p2_hand_5,
                p2Hand6: y.p2_hand_6,
                p2Hand7: y.p2_hand_7
            })
        }
    }

    getP1Deck = () => {
        return this.props.state.userDeck
    }

    getP1Key = () => {
        if (this.props.state.playerOne) {
            return this.props.location.key
        }
    }

    getP2Key = () => {
        if (this.props.state.playerTwo) {
            return this.props.location.key
        }
    }

    roomNumber = () => {

    }

    // hand1 = () => {

    // }

    p1Card1 = () => {
        // if (this.state.p2) {
        //     return <img src={'http://p2.i.ntere.st/eb8ff3b2e798f57bda0621b7e33af4ca_480.jpg'} alt='img3' />
        // } else 
        if (this.props.state.playerOne && this.props.state.p1Hand1) {
            return <img src={this.props.state.p1Hand1.card.image_path} alt='img1' />
        } else if (this.state !== undefined && this.state.p1Hand1 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand1} alt='img2' />
        }
    }

    p1Card2 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand2) {
            return <img src={this.props.state.p1Hand2.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand2 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand2} alt='img2' />
        }
    }

    p1Card3 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand3) {
            return <img src={this.props.state.p1Hand3.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand3 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand3} alt='img2' />
        }
    }

    p1Card4 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand4) {
            return <img src={this.props.state.p1Hand4.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand4 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand4} alt='img24' />
        }
    }

    p1Card5 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand5) {
            return <img src={this.props.state.p1Hand5.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand5 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand5} alt='img25' />
        }
    }

    p1Card6 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand6) {
            return <img src={this.props.state.p1Hand6.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand6 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand6} alt='img26' />
        }
    }

    p1Card7 = () => {
        if (this.props.state.playerOne && this.props.state.p1Hand7) {
            return <img src={this.props.state.p1Hand7.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p1Hand7 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p1Hand7} alt='img27' />
        }
    }

    p2Card1 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand1) {
            return <img src={this.props.state.p2Hand1.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand1 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand1} alt='1' />
        }
    }

    p2Card2 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand2) {
            return <img src={this.props.state.p2Hand2.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand2 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand2} alt='2' />
        }
    }

    p2Card3 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand3) {
            return <img src={this.props.state.p2Hand3.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand3 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand3} alt='3' />
        }
    }

    p2Card4 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand4) {
            return <img src={this.props.state.p2Hand4.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand4 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand4} alt='4' />
        }
    }

    p2Card5 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand5) {
            return <img src={this.props.state.p2Hand5.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand5 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand5} alt='5' />
        }
    }

    p2Card6 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand6) {
            return <img src={this.props.state.p2Hand6.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand6 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand6} alt='6' />
        }
    }

    p2Card7 = () => {
        if (this.props.state.playerTwo && this.props.state.p2Hand7) {
            return <img src={this.props.state.p2Hand7.card.image_path} alt='img' />
        } else if (this.state !== undefined && this.state.p2Hand7 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
            return <img src={this.state.p2Hand7} alt='7' />
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
                <div>
                    {this.p1Card1()}
                    {this.p1Card2()}
                    {this.p1Card3()}
                    {this.p1Card4()}
                    {this.p1Card5()}
                    {this.p1Card6()}
                    {this.p1Card7()}
                </div>
                <div>
                    {this.p2Card1()}
                    {this.p2Card2()}
                    {this.p2Card3()}
                    {this.p2Card4()}
                    {this.p2Card5()}
                    {this.p2Card6()}
                    {this.p2Card7()}
                </div>

            </div>
        );
    }
}


export default GameRoom
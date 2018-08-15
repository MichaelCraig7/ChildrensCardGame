import React, { Component } from 'react'
import axios from 'axios'

class GameRoom extends Component {

    state = {
        game: {},
        flop: true,
        turn: '',
        p1Deck: [],
        p2Deck: [],
        currentDeck: [],
        p1: '',
        p2: ''
    }

    componentDidMount() {
        this.populateBoard()
        setInterval(() => {
            this.renderer()
        }, 1250)
    }

    renderer = async () => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.state
        const y = game.data
        if (x.p2 || this.props.location.key === y.key) {
            setInterval(() => {
                window.location.reload()
            }, 2500)
            console.log('ping2');
        }
        if (y.p1 === y.key && this.props.location.key === x.p1) {
            setInterval(() => {
                window.location.reload()
            }, 2500)
            console.log('ping3');
        }
    }

    populateBoard = async (val, updated) => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.props.state
        const y = game.data
        // if (this.props.location.key === y.p1 && val) {
        //     let payload = { ...this.state }
        //     payload.p1_life_points = y.p1_life_points - val
        //     axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        //     .then(res => {
        //         this.props.history.push(`/gameroom/${this.props.match.params.id}`)
        //     })
        //     return
        // }
        // if (this.props.location.key === y.p2 && val) {
        //     let payload = { ...this.state }
        //     payload.p2_life_points = y.p2_life_points - val
        //     axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        //     .then(res => {
        //         this.props.history.push(`/gameroom/${this.props.match.params.id}`)
        //     })
        //     return
        // }
        if (x.playerOne) {
            const p1Deck = await this.getP1Deck()
            const p1Hand = await this.populateHand()
            let payload = { ...this.state }
            payload.p1 = this.props.location.key
            payload.p1_deck_1 = p1Deck[0].card.image_path
            payload.p1_deck_2 = p1Deck[1].card.image_path
            payload.p1_deck_3 = p1Deck[2].card.image_path
            payload.p1_deck_4 = p1Deck[3].card.image_path
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            let currentDeck = []
            currentDeck.push(p1Deck[0].card.image_path)
            currentDeck.push(p1Deck[1].card.image_path)
            currentDeck.push(p1Deck[2].card.image_path)
            currentDeck.push(p1Deck[3].card.image_path)
            this.setState({
                p1: this.props.location.key,
                p1Deck: p1Deck,
                turn: true,
                game: update.data,
                currentDeck
            })
        }
        else if (x.playerTwo) {
            const p2Deck = await this.getP2Deck()
            const p2Hand = await this.populateHand()
            let payload = { ...this.state }
            payload.p2 = this.props.location.key
            payload.p2_deck_1 = p2Deck[0].card.image_path
            payload.p2_deck_2 = p2Deck[1].card.image_path
            payload.p2_deck_3 = p2Deck[2].card.image_path
            payload.p2_deck_4 = p2Deck[3].card.image_path
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            this.setState({
                p2: this.props.location.key,
                p2Deck: p2Deck,
                game: update.data
            })
        }
        else if (y.turn === true && val === 'z') {
            console.log('deck changes to p2');
            let currentDeck = []
            currentDeck.push(y.p2_deck_1)
            currentDeck.push(y.p2_deck_2)
            currentDeck.push(y.p2_deck_3)
            currentDeck.push(y.p2_deck_4)
            this.setState({
                p1: y.p1,
                currentDeck,
                game: updated
            })
        }
        else if (y.turn === false && val === 'z') {
            console.log('deck changed to p1');
            let currentDeck = []
            currentDeck.push(y.p1_deck_1)
            currentDeck.push(y.p1_deck_2)
            currentDeck.push(y.p1_deck_3)
            currentDeck.push(y.p1_deck_4)
            this.setState({
                p2: y.p2,
                currentDeck,
                game: updated
            })
        }
        else {
            const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
            this.setState({
                game
            })
        }
        // if this.state.turn === true then p1Deck is current deck
        // if this.state.turn === falase then p2Deck is current deck
        // when turn button is clicked, location.key for p1 is read and saved
        // then if p1's location.key equals the stored key, p1 can't do anything
        // then wheb p2 clicks turn button, location.key for p2 is read and same stuff happens
        // when location.key no longer matches stored key, that player can draw a card and play turn (user interval)
        // 
    }


    getP1Deck = () => {
        let p1Deck = []
        this.props.state.userDeck.map(card => {
            if (card) {
                p1Deck.push(card)
            }
        })
        return p1Deck
    }

    getP2Deck = () => {
        let p2Deck = []
        this.props.state.userDeck2.map(card => {
            if (card) {
                p2Deck.push(card)
            }
        })
        return p2Deck
    }

    // p1Card2 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand2) {
    //         return <img src={this.props.state.p1Hand2.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand2 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand2} alt='img2' />
    //     }
    // }

    // p1Card3 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand3) {
    //         return <img src={this.props.state.p1Hand3.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand3 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand3} alt='img2' />
    //     }
    // }

    // p1Card4 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand4) {
    //         return <img src={this.props.state.p1Hand4.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand4 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand4} alt='img24' />
    //     }
    // }

    // p1Card5 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand5) {
    //         return <img src={this.props.state.p1Hand5.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand5 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand5} alt='img25' />
    //     }
    // }

    // p1Card6 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand6) {
    //         return <img src={this.props.state.p1Hand6.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand6 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand6} alt='img26' />
    //     }
    // }

    // p1Card7 = () => {
    //     if (this.props.state.playerOne && this.props.state.p1Hand7) {
    //         return <img src={this.props.state.p1Hand7.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p1Hand7 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p1Hand7} alt='img27' />
    //     }
    // }

    // p2Card1 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand1) {
    //         return <img src={this.props.state.p2Hand1.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand1 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand1} alt='1' />
    //     }
    // }

    // p2Card2 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand2) {
    //         return <img src={this.props.state.p2Hand2.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand2 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand2} alt='2' />
    //     }
    // }

    // p2Card3 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand3) {
    //         return <img src={this.props.state.p2Hand3.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand3 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand3} alt='3' />
    //     }
    // }

    // p2Card4 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand4) {
    //         return <img src={this.props.state.p2Hand4.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand4 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand4} alt='4' />
    //     }
    // }

    // p2Card5 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand5) {
    //         return <img src={this.props.state.p2Hand5.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand5 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand5} alt='5' />
    //     }
    // }

    // p2Card6 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand6) {
    //         return <img src={this.props.state.p2Hand6.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand6 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand6} alt='6' />
    //     }
    // }

    // p2Card7 = () => {
    //     if (this.props.state.playerTwo && this.props.state.p2Hand7) {
    //         return <img src={this.props.state.p2Hand7.card.image_path} alt='img' />
    //     } else if (this.state !== undefined && this.state.p2Hand7 !== null && !this.props.state.playerOne && !this.props.state.playerTwo) {
    //         return <img src={this.state.p2Hand7} alt='7' />
    //     }
    // }

    completeTurn = async () => {
        console.log('ct')
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        let payload = { ...this.state }
        payload.turn = !this.state.turn
        payload.key = this.props.location.key
        const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        console.log(game.data.p2)
        console.log(game.data.key)
        this.populateBoard('z', update)
    }

    // if this.state.turn === true then p1Deck is current deck
    // if this.state.turn === falase then p2Deck is current deck
    // when turn button is clicked, location.key for p1 is read and saved
    // then if p1's location.key equals the stored key, p1 can't do anything
    // then wheb p2 clicks turn button, location.key for p2 is read and same stuff happens
    // when location.key no longer matches stored key, that player can draw a card and play turn (user interval)

    // minusLP = async (val) => {
    //     console.log('minus');
    //     const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
    //     let payload = { ...this.state }
    //     if (this.props.location.key === game.data.p1) {
    //         payload.p1_life_points = game.data.p1_life_points - val
    //         axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
    //             .then(res => {
    //                 this.props.history.push(`/gameroom/${this.props.match.params.id}`)
    //             })
    //         console.log('1', payload);
    //     } else if (this.props.location.key === game.data.p2) {
    //         payload.p2_life_points = game.data.p2_life_points - val
    //         axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
    //         .then(res => {
    //             this.props.history.push(`/gameroom/${this.props.match.params.id}`)
    //         })
    //         console.log('2', payload);
    //     }
    //     this.populateBoard()
    // }
    changeLife = async (changeLP) => {


        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const y = game.data
        console.log('hit');
        console.log(changeLP);
        console.log(this.props.location.key);
        console.log(y.p1);

        if (this.props.location.key === y.p1 && changeLP) {
            console.log('hit1');
            let payload = { ...this.state }
            payload.p1_life_points = y.p1_life_points - changeLP
            axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
                .then(res => {
                    this.props.history.push(`/gameroom/${this.props.match.params.id}`)
                })
            this.setState({
                p1LifePoints: y.p1_life_points
            })
            return
        }
        if (this.props.location.key === y.p2 && changeLP) {
            let payload = { ...this.state }
            payload.p2_life_points = y.p2_life_points - changeLP
            axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
                .then(res => {
                    this.props.history.push(`/gameroom/${this.props.match.params.id}`)
                })
            return
        }
    }

    populateHand = async () => {
        if (this.props.state.playerOne) {
            console.log('hit1');

            let hand = []
            let payload = { ...this.state }
            for (let i = 1; i < 6; i++) {
                const deck = this.props.state.userDeck
                let cards = []
                deck.map(card => {
                    if (card) {
                        cards.push(card)
                    }
                })
                const card = await cards[Math.floor(Math.random() * cards.length)]
                console.log(card);

                const cardImage = card.card.image_path
                hand.push(cardImage)
            }
            payload.p1_hand_1 = hand[0]
            payload.p1_hand_2 = hand[1]
            payload.p1_hand_3 = hand[2]
            payload.p1_hand_4 = hand[3]
            payload.p1_hand_5 = hand[4]
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            console.log(update);

            return update
        }
        if (this.props.state.playerTwo) {
            let hand = []
            let payload = { ...this.state }
            for (let i = 0; i < 6; i++) {
                const deck = this.props.state.userDeck2
                let cards = []
                deck.map(card => {
                    if (card) {
                        cards.push(card)
                    }
                })
                const card = await cards[Math.floor(Math.random() * cards.length)]
                const cardImage = card.card.image_path
                hand.push(cardImage)
            }
            payload.p2_hand_1 = hand[0]
            payload.p2_hand_2 = hand[1]
            payload.p2_hand_3 = hand[2]
            payload.p2_hand_4 = hand[3]
            payload.p2_hand_5 = hand[4]
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            return update
        }
    }

    draw = async () => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.props.state
        const y = game.data
        const deck1 = [y.p1_deck_1, y.p1_deck_2, y.p1_deck_3, y.p1_deck_4, y.p1_deck_5, y.p1_deck_6, y.p1_deck_7, y.p1_deck_8, y.p1_deck_9, y.p1_deck_10, y.p1_deck_11, y.p1_deck_12, y.p1_deck_13, y.p1_deck_14, y.p1_deck_15, y.p1_deck_16, y.p1_deck_17, y.p1_deck_18, y.p1_deck_19, y.p1_deck_20, y.p1_deck_21, y.p1_deck_22, y.p1_deck_23, y.p1_deck_24, y.p1_deck_25, y.p1_deck_26, y.p1_deck_27, y.p1_deck_28, y.p1_deck_29, y.p1_deck_30, y.p1_deck_31, y.p1_deck_32, y.p1_deck_33, y.p1_deck_34, y.p1_deck_35, y.p1_deck_36, y.p1_deck_37, y.p1_deck_38, y.p1_deck_39, y.p1_deck_40]
        const deck2 = [y.p2_deck_1, y.p2_deck_2, y.p2_deck_3, y.p2_deck_4, y.p2_deck_5, y.p2_deck_6, y.p2_deck_7, y.p2_deck_8, y.p2_deck_9, y.p2_deck_10, y.p2_deck_11, y.p2_deck_12, y.p2_deck_13, y.p2_deck_14, y.p2_deck_15, y.p2_deck_16, y.p2_deck_17, y.p2_deck_18, y.p2_deck_19, y.p2_deck_20, y.p2_deck_21, y.p2_deck_22, y.p2_deck_23, y.p2_deck_24, y.p2_deck_25, y.p2_deck_26, y.p2_deck_27, y.p2_deck_28, y.p2_deck_29, y.p2_deck_30, y.p2_deck_31, y.p2_deck_32, y.p2_deck_33, y.p2_deck_34, y.p2_deck_35, y.p2_deck_36, y.p2_deck_37, y.p2_deck_38, y.p2_deck_39, y.p2_deck_40]
        if (x.playerOne || y.turn === true) {
            const card = await deck1[Math.floor(Math.random() * deck1.length)]
            let payload = { ...this.state }
            if (!y.p1_hand_1) {
                payload.p1_hand_1 = card
            } else if (!y.p1_hand_2) {
                payload.p1_hand_2 = card
            } else if (!y.p1_hand_3) {
                payload.p1_hand_3 = card
            } else if (!y.p1_hand_4) {
                payload.p1_hand_4 = card
            } else if (!y.p1_hand_5) {
                payload.p1_hand_5 = card
            } else if (!y.p1_hand_6) {
                payload.p1_hand_6 = card
            } else if (!y.p1_hand_7) {
                payload.p1_hand_7 = card
            }
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        } else if (x.playerTwo || y.turn === false) {
            const card = await deck2[Math.floor(Math.random() * deck2.length)]
            let payload = { ...this.state }
            if (!y.p2_hand_1) {
                payload.p2_hand_1 = card
            } else if (!y.p2_hand_2) {
                payload.p2_hand_2 = card
            } else if (!y.p2_hand_3) {
                payload.p2_hand_3 = card
            } else if (!y.p2_hand_4) {
                payload.p2_hand_4 = card
            } else if (!y.p2_hand_5) {
                payload.p2_hand_5 = card
            } else if (!y.p2_hand_6) {
                payload.p2_hand_6 = card
            } else if (!y.p2_hand_7) {
                payload.p2_hand_7 = card
            }
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        }
    }

    getGame = async () => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        return game
    }

    handCard = (val) => {
        const y = this.state.game.data
        console.log(y.p1_hand_1);

        if (val === 'p1c1' && y.p1_hand_1 && this.props.location.key === y.p1) {
            console.log('inside', y.p1_hand_1)
            return y.p1_hand_1
        } else if (val === 'p1c1' && y.p1_hand_1 && this.props.location.key !== y.p1) {
            return 'http://p2.i.ntere.st/eb8ff3b2e798f57bda0621b7e33af4ca_480.jpg'
        } else {
            return 'http://p2.i.ntere.st/eb8ff3b2e798f57bda0621b7e33af4ca_480.jpg'
        }
    }

    render() {

        // if (this.state.game.data) {
        const x = this.state.game.data
        //     console.log('dsds', this.state.game.data)
        return (
            <div>
                {this.state.game.data
                    ?
                    <div>
                        <div>
                            {this.state.turn ? <h1>Player 2 Turn</h1> : <h1>Player 1 Turn</h1>}
                        </div>
                        <div>
                            <button onClick={() => this.draw()}>Draw</button>
                            <button onClick={() => this.completeTurn()}>Turn Complete</button>
                            <button onClick={() => this.changeLife(100)}>-100</button>
                            <button onClick={() => this.changeLife(1000)}>-1000</button>
                        </div>
                        <div>
                            <img src={x.p1_hand_1} alt='' />
                            <img src={x.p1_hand_2} alt='' />
                            <img src={x.p1_hand_3} alt='' />
                            <img src={x.p1_hand_4} alt='' />
                            <img src={x.p1_hand_5} alt='' />
                            <img src={x.p1_hand_6} alt='' />
                            <img src={x.p1_hand_7} alt='' />
                        </div>
                        <div>
                            <img src={x.p2_hand_1} alt='' />
                            <img src={x.p2_hand_2} alt='' />
                            <img src={x.p2_hand_3} alt='' />
                            <img src={x.p2_hand_4} alt='' />
                            <img src={x.p2_hand_5} alt='' />
                            <img src={x.p2_hand_6} alt='' />
                            <img src={x.p2_hand_7} alt='' />
                        </div>
                        <div>{this.state.p1LifePoints}</div>
                        <div>{this.state.p2LifePoints}</div>
                    </div>
                    :
                    <button onClick={() => window.location.reload()}>Ready</button>
                }
            </div>
        )
        // }
    }
}


export default GameRoom
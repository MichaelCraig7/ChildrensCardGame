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

    populateBoard = async (val) => {
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
            // let hand = []
            // hand.push(y.p1_hand_1)
            // hand.push(y.p1_hand_2)
            // hand.push(y.p1_hand_3)
            // hand.push(y.p1_hand_4)
            // hand.push(y.p1_hand_5)
            console.log(game.data);
            console.log(update);
            
            this.setState({
                p1: this.props.location.key,
                p1Deck: p1Deck,
                turn: true,
                game: update.data
                // p1Hand: hand
            })
        }
        if (x.playerTwo) {
            const p2Deck = await this.getP2Deck()
            const p2Hand = await this.populateHand()
            console.log(p2Hand);
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
        if (y.turn === true && val === 'z') {
            console.log('deck changes to p2');
            let currentDeck = []
            currentDeck.push(y.p2_deck_1)
            currentDeck.push(y.p2_deck_2)
            currentDeck.push(y.p2_deck_3)
            currentDeck.push(y.p2_deck_4)
            this.setState({
                p1: y.p1,
                currentDeck
            })
        }
        if (y.turn === false && val === 'z') {
            console.log('deck changed to p1');
            let currentDeck = []
            currentDeck.push(y.p1_deck_1)
            currentDeck.push(y.p1_deck_2)
            currentDeck.push(y.p1_deck_3)
            currentDeck.push(y.p1_deck_4)
            this.setState({
                p2: y.p2,
                currentDeck
            })
        }

        // if this.state.turn === true then p1Deck is current deck
        // if this.state.turn === falase then p2Deck is current deck
        // when turn button is clicked, location.key for p1 is read and saved
        // then if p1's location.key equals the stored key, p1 can't do anything
        // then wheb p2 clicks turn button, location.key for p2 is read and same stuff happens
        // when location.key no longer matches stored key, that player can draw a card and play turn (user interval)
        // 




        if (!x.playerOne && !x.playerTwo) {
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
            let payload = { ...this.state }
            payload.turn = this.state.turn
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            console.log(update)
        }
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

    completeTurn = async () => {
        console.log('ct')
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        let payload = { ...this.state }
        payload.turn = !this.state.turn
        payload.key = this.props.location.key
        const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        console.log(game.data.p2)
        console.log(game.data.key)
        this.populateBoard('z')
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
                const cards = this.props.state.userDeck
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
                const cards = this.props.state.userDeck2
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

    render() {

        return (
            <div>

                <h1>GameRoom</h1>
                <button onClick={() => this.draw()}>Draw</button>
                <button onClick={() => this.completeTurn()}>Turn Complete</button>
                <button onClick={() => this.changeLife(100)}>-100</button>
                <button onClick={() => this.changeLife(1000)}>-1000</button>
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
                <div>
                    {this.state.turn ? <h1>Player 1 Turn</h1> : <h1>Player 2 Turn</h1>}
                </div>
                <div>{this.state.p1LifePoints}</div>
                <div>{this.state.p2LifePoints}</div>
            </div>
        );
    }
}


export default GameRoom
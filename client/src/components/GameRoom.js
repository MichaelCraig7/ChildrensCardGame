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
        p2: '',
        yourMonsters: [],
        yourMagic: [],
        theirMonsters: [],
        theirMagic: [],
        hand1: false,
        hand2: false,
        hand3: false,
        hand4: false,
        hand5: false,
        hand6: false,
        hand7: false,
        hand12: false,
        hand22: false,
        hand32: false,
        hand42: false,
        hand52: false,
        hand62: false,
        hand72: false,
    }

    componentDidMount = async () => {
        const big = await this.populateBoard()
        setInterval(() => {
            this.renderer()
        }, 1250)
        return big
    }

    renderer = async () => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.state
        const y = game.data
        console.log('ping');

        if (x.turn === true || this.props.location.key === y.p2) {
            setInterval(() => {
                window.location.reload()
            }, 25000)
            console.log('ping2');
        }
        if (y.p1 === y.key || this.props.location.key === y.key) {
            setInterval(() => {
                window.location.reload()
            }, 25000)
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
        if (x.playerOne === true) {
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
                game: update.data,
                turn: true,
                currentDeck
            })
            return update
        }
        else if (x.playerTwo === true) {
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
            return update
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

    completeTurn = async () => {
        console.log('complete turn hit')
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        let payload = { ...this.state }
        console.log(game.data)
        if (game.data.turn === '' || game.data.turn === true) {
            payload.turn = false
            payload.p2 = this.props.location.key
        }
        if (game.data.turn === false) {
            payload.turn = true
            payload.p1 = this.props.location.key
        }
        payload.key = this.props.location.key
        const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        console.log('game.data.p2',game.data.p2)
        console.log('game.data.key',game.data.key)
        console.log('update',update);

        this.populateBoard('z', update)
    }

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
        if (x.playerOne || y.turn ===  true || y.turn === '') {
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
        } else if (x.playerTwo || y.turn === 'f' || y.turn === false) {
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

    placement = async(image, type) => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        let monsters = []
        let magic = []
        if (this.props.location.key === game.data.key) {
            if (type = 'monster') {
                monsters.push(image)
                this.setState({
                    yourMonsters: monsters
                })
            } else if (type = 'magic') {
                magic.push(image)
                this.setState({
                    yourMagic: magic
                })
            }
        }
        let payload = { ...this.state }
        payload.p1Monster1 = monsters[0]
        payload.p1Monster2 = monsters[1]
        payload.p1Monster3 = monsters[2]
        payload.p1Monster4 = monsters[3]
        payload.p1Monster5 = monsters[4]
        payload.p2Monster1 = monsters[0]
        payload.p2Monster2 = monsters[1]
        payload.p2Monster3 = monsters[2]
        payload.p2Monster4 = monsters[3]
        payload.p2Monster5 = monsters[4]
        payload.p1Magic1 = magic[0]
        payload.p1Magic2 = magic[1]
        payload.p1Magic3 = magic[2]
        payload.p1Magic4 = magic[3]
        payload.p1Magic5 = magic[4]
        payload.p2Magic1 = magic[0]
        payload.p2Magic2 = magic[1]
        payload.p2Magic3 = magic[2]
        payload.p2Magic4 = magic[3]
        payload.p2Magic5 = magic[4]
        const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
    }

    imageClicked = (val) => {
        if (val === 'hand1')
            this.setState({
                hand1: !this.state.hand1
            })
        else if (val === 'hand2')
            this.setState({
                hand2: !this.state.hand2
            })
        else if (val === 'hand3')
            this.setState({
                hand3: !this.state.hand3
            })
        else if (val === 'hand4')
            this.setState({
                hand4: !this.state.hand4
            })
        else if (val === 'hand5')
            this.setState({
                hand5: !this.state.hand5
            })
        else if (val === 'hand6')
            this.setState({
                hand6: !this.state.hand6
            })
        else if (val === 'hand7')
            this.setState({
                hand7: !this.state.hand7
            })
        else if (val === 'hand12')
            this.setState({
                hand12: !this.state.hand12
            })
        else if (val === 'hand22')
            this.setState({
                hand22: !this.state.hand22
            })
        else if (val === 'hand32')
            this.setState({
                hand32: !this.state.hand32
            })
        else if (val === 'hand42')
            this.setState({
                hand42: !this.state.hand42
            })
        else if (val === 'hand52')
            this.setState({
                hand52: !this.state.hand52
            })
        else if (val === 'hand62')
            this.setState({
                hand62: !this.state.hand62
            })
        else if (val === 'hand72')
            this.setState({
                hand72: !this.state.hand72
            })
    }

    clickedCard = () => {
        this.setState({
            hand1: false,
            hand2: false,
            hand3: false,
            hand4: false,
            hand5: false,
            hand6: false,
            hand7: false,
            hand12: false,
            hand22: false,
            hand32: false,
            hand42: false,
            hand52: false,
            hand62: false,
            hand72: false
        })
    }

    render() {

        const x = this.state.game.data
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
                        {this.state.hand1 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_1} alt='' /></a >
                                <button onClick={() => this.placement(x.p1_hand_1, 'monster')}>Monster</button>
                                <button onClick={() => this.placement(x.p1_hand_1, 'magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand2 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_2} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand3 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_3} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand4 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_4} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand5 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_5} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand6 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_6} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand7 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p1_hand_7} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand12 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_1} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand22 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_2} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand32 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_3} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand42 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_4} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand52 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_5} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand62 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_6} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        {this.state.hand72 ?
                            <div>
                                <a onClick={() => this.clickedCard()}><img src={x.p2_hand_7} alt='' /></a>
                                <button onClick={() => this.placement('monster')}>Monster</button>
                                <button onClick={() => this.placement('magic')}>Spell/Trap</button>
                            </div>
                            : null
                        }
                        <div>
                            <a onClick={() => this.imageClicked('hand1')}><img src={x.p1_hand_1} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand2')}><img src={x.p1_hand_2} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand3')}><img src={x.p1_hand_3} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand4')}><img src={x.p1_hand_4} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand5')}><img src={x.p1_hand_5} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand6')}><img src={x.p1_hand_6} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand7')}><img src={x.p1_hand_7} alt='' /></a>
                        </div>
                        <div>
                            <a onClick={() => this.imageClicked('hand12')}><img src={x.p2_hand_1} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand22')}><img src={x.p2_hand_2} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand32')}><img src={x.p2_hand_3} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand42')}><img src={x.p2_hand_4} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand52')}><img src={x.p2_hand_5} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand62')}><img src={x.p2_hand_6} alt='' /></a>
                            <a onClick={() => this.imageClicked('hand72')}><img src={x.p2_hand_7} alt='' /></a>
                        </div>
                        <div>{this.state.p1LifePoints}</div>
                        <div>{this.state.p2LifePoints}</div>
                    </div>
                    :
                    <button onClick={() => window.location.reload()}>Ready</button>
                }
            </div>
        )
    }
}


export default GameRoom
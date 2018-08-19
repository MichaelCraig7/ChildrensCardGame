import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Field = styled.div`
    img {
        height: 15vh
    }
`

const Hands = styled.div`
    img {
        height:10vh
    }
`
const ClickedCard = styled.div`
    
`

class GameRoom extends Component {

    state = {
        game: {},
        flop: true,
        turn: '',
        p1Key: '',
        p2Key: '',
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
        setInterval(() => {
            this.populateBoard()
        }, 1500)
    }

    populateBoard = async (val, updated) => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const x = this.props.state
        const y = game.data
        let currentDeck = []
        let yourMonsters = []
        let yourMagic = []
        let theirMonsters = []
        let theirMagic = []
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
            console.log('doh');

            const p1Deck = await this.getP1Deck()
            const p1Hand = await this.populateHand()
            let payload = { ...this.state }
            payload.p1 = this.props.location.key
            payload.player1Key = this.props.location.key
            payload.p1_deck_1 = p1Deck[0].card.image_path
            payload.p1_deck_2 = p1Deck[1].card.image_path
            payload.p1_deck_3 = p1Deck[2].card.image_path
            payload.p1_deck_4 = p1Deck[3].card.image_path
            payload.p1_deck_5 = p1Deck[4].card.image_path
            payload.p1_deck_6 = p1Deck[5].card.image_path
            payload.p1_deck_7 = p1Deck[6].card.image_path
            payload.p1_deck_8 = p1Deck[7].card.image_path
            payload.p1_deck_9 = p1Deck[8].card.image_path
            payload.p1_deck_10 = p1Deck[9].card.image_path
            payload.p1_deck_11 = p1Deck[10].card.image_path
            payload.p1_deck_12 = p1Deck[11].card.image_path
            payload.p1_deck_13 = p1Deck[12].card.image_path
            payload.p1_deck_14 = p1Deck[13].card.image_path
            payload.p1_deck_15 = p1Deck[14].card.image_path
            payload.p1_deck_16 = p1Deck[15].card.image_path
            payload.p1_deck_17 = p1Deck[16].card.image_path
            payload.p1_deck_18 = p1Deck[17].card.image_path
            payload.p1_deck_19 = p1Deck[18].card.image_path
            payload.p1_deck_20 = p1Deck[19].card.image_path
            payload.p1_deck_21 = p1Deck[20].card.image_path
            payload.p1_deck_22 = p1Deck[21].card.image_path
            payload.p1_deck_23 = p1Deck[22].card.image_path
            payload.p1_deck_24 = p1Deck[23].card.image_path
            payload.p1_deck_25 = p1Deck[24].card.image_path
            payload.p1_deck_26 = p1Deck[25].card.image_path
            payload.p1_deck_27 = p1Deck[26].card.image_path
            payload.p1_deck_28 = p1Deck[27].card.image_path
            payload.p1_deck_29 = p1Deck[28].card.image_path
            payload.p1_deck_30 = p1Deck[29].card.image_path
            payload.p1_deck_31 = p1Deck[30].card.image_path
            payload.p1_deck_32 = p1Deck[31].card.image_path
            payload.p1_deck_33 = p1Deck[32].card.image_path
            payload.p1_deck_34 = p1Deck[33].card.image_path
            payload.p1_deck_35 = p1Deck[34].card.image_path
            payload.p1_deck_36 = p1Deck[35].card.image_path
            payload.p1_deck_37 = p1Deck[36].card.image_path
            payload.p1_deck_38 = p1Deck[37].card.image_path
            payload.p1_deck_39 = p1Deck[38].card.image_path
            payload.p1_deck_40 = p1Deck[39].card.image_path
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            let currentDeck = []
            currentDeck.push(p1Deck[0].card.image_path)
            currentDeck.push(p1Deck[1].card.image_path)
            currentDeck.push(p1Deck[2].card.image_path)
            currentDeck.push(p1Deck[3].card.image_path)
            this.setState({
                p1: this.props.location.key,
                p1Key: y.player1Key,
                p1Deck: p1Deck,
                game: update.data,
                turn: true,
                currentDeck
            })
            return update
        }
        else if (x.playerTwo === true) {
            console.log('good');

            const p2Deck = await this.getP2Deck()
            const p2Hand = await this.populateHand()
            let payload = { ...this.state }
            payload.p2 = this.props.location.key
            payload.player1Key = y.player1Key
            payload.player2Key = this.props.location.key
            payload.p2_deck_1 = p2Deck[0].card.image_path
            payload.p2_deck_2 = p2Deck[1].card.image_path
            payload.p2_deck_3 = p2Deck[2].card.image_path
            payload.p2_deck_4 = p2Deck[3].card.image_path
            payload.p2_deck_5 = p2Deck[4].card.image_path
            payload.p2_deck_6 = p2Deck[5].card.image_path
            payload.p2_deck_7 = p2Deck[6].card.image_path
            payload.p2_deck_8 = p2Deck[7].card.image_path
            payload.p2_deck_9 = p2Deck[8].card.image_path
            payload.p2_deck_10 = p2Deck[9].card.image_path
            payload.p2_deck_11 = p2Deck[10].card.image_path
            payload.p2_deck_12 = p2Deck[11].card.image_path
            payload.p2_deck_13 = p2Deck[12].card.image_path
            payload.p2_deck_14 = p2Deck[13].card.image_path
            payload.p2_deck_15 = p2Deck[14].card.image_path
            payload.p2_deck_16 = p2Deck[15].card.image_path
            payload.p2_deck_17 = p2Deck[16].card.image_path
            payload.p2_deck_18 = p2Deck[17].card.image_path
            payload.p2_deck_19 = p2Deck[18].card.image_path
            payload.p2_deck_20 = p2Deck[19].card.image_path
            payload.p2_deck_21 = p2Deck[20].card.image_path
            payload.p2_deck_22 = p2Deck[21].card.image_path
            payload.p2_deck_23 = p2Deck[22].card.image_path
            payload.p2_deck_24 = p2Deck[23].card.image_path
            payload.p2_deck_25 = p2Deck[24].card.image_path
            payload.p2_deck_26 = p2Deck[25].card.image_path
            payload.p2_deck_27 = p2Deck[26].card.image_path
            payload.p2_deck_28 = p2Deck[27].card.image_path
            payload.p2_deck_29 = p2Deck[28].card.image_path
            payload.p2_deck_30 = p2Deck[29].card.image_path
            payload.p2_deck_31 = p2Deck[30].card.image_path
            payload.p2_deck_32 = p2Deck[31].card.image_path
            payload.p2_deck_33 = p2Deck[32].card.image_path
            payload.p2_deck_34 = p2Deck[33].card.image_path
            payload.p2_deck_35 = p2Deck[34].card.image_path
            payload.p2_deck_36 = p2Deck[35].card.image_path
            payload.p2_deck_37 = p2Deck[36].card.image_path
            payload.p2_deck_38 = p2Deck[37].card.image_path
            payload.p2_deck_39 = p2Deck[38].card.image_path
            payload.p2_deck_40 = p2Deck[39].card.image_path
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            this.setState({
                p2: this.props.location.key,
                p2Key: y.player2Key,
                game: update.data,
                p2Deck: p2Deck
            })
            return update
        }
        else if ((val === 'c' && y.key === y.player1Key) || y.p2 === y.key && val === 'z') {
            console.log('deck changes to p2');
            currentDeck.push(y.p2_deck_1)
            currentDeck.push(y.p2_deck_2)
            currentDeck.push(y.p2_deck_3)
            currentDeck.push(y.p2_deck_4)
            yourMonsters.push(y.p2Monsters1)
            yourMonsters.push(y.p2Monsters2)
            yourMonsters.push(y.p2Monsters3)
            yourMonsters.push(y.p2Monsters4)
            yourMonsters.push(y.p2Monsters5)
            yourMagic.push(y.p2Magic1)
            yourMagic.push(y.p2Magic2)
            yourMagic.push(y.p2Magic3)
            yourMagic.push(y.p2Magic4)
            yourMagic.push(y.p2Magic5)
            this.setState({
                p2: y.p2,
                p2Key: y.player2Key,
                currentDeck,
                game: updated,
                yourMonsters,
                yourMagic,
                theirMonsters,
                theirMagic
            })
        }
        else if ((val === 'c' && y.key === y.player2Key) || (val === 'z' && !y.p1 && !y.p2) || (val === 'z' && y.p2 && !y.key && y.p1 === null)) {
            console.log('deck changed to p1');
            currentDeck.push(y.p1_deck_1)
            currentDeck.push(y.p1_deck_2)
            currentDeck.push(y.p1_deck_3)
            currentDeck.push(y.p1_deck_4)
            yourMonsters.push(y.p1Monsters1)
            yourMonsters.push(y.p1Monsters2)
            yourMonsters.push(y.p1Monsters3)
            yourMonsters.push(y.p1Monsters4)
            yourMonsters.push(y.p1Monsters5)
            yourMagic.push(y.p1Magic1)
            yourMagic.push(y.p1Magic2)
            yourMagic.push(y.p1Magic3)
            yourMagic.push(y.p1Magic4)
            yourMagic.push(y.p1Magic5)
            this.setState({
                p1: y.p1,
                p1Key: y.player1Key,
                currentDeck,
                game: updated,
                yourMonsters,
                yourMagic,
                theirMonsters,
                theirMagic

            })
        } else {
            const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
            this.setState({
                game
            })
        }
        if (this.props.location.key === y.player1Key) {

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
        console.log('game.data.p2', game.data.p2)
        console.log('game.data.key', game.data.key)
        console.log('update', update);

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
        console.log(deck1);

        if (x.playerOne || y.key === null || this.props.location.key === y.player1Key) {
            let card = deck1[Math.floor(Math.random() * deck1.length)]
            console.log('p1draw')
            let payload = { ...this.state }
            if (y.p1_hand_1 === null) {
                payload.p1_hand_1 = card
            } else if (y.p1_hand_2 === null) {
                payload.p1_hand_2 = card
            } else if (y.p1_hand_3 === null) {
                payload.p1_hand_3 = card
            } else if (y.p1_hand_4 === null) {
                payload.p1_hand_4 = card
            } else if (y.p1_hand_5 === null) {
                payload.p1_hand_5 = card
            } else if (y.p1_hand_6 === null) {
                payload.p1_hand_6 = card
            } else if (y.p1_hand_7 === null) {
                payload.p1_hand_7 = card
            }
            console.log(payload);
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            return update
        } else if (x.playerTwo || this.props.location.key === y.player2Key) {
            let card = deck2[Math.floor(Math.random() * deck2.length)]
            console.log('p2draw');

            let payload = { ...this.state }
            if (y.p2_hand_1 === null) {
                payload.p2_hand_1 = card
            } else if (y.p2_hand_2 === null) {
                payload.p2_hand_2 = card
            } else if (y.p2_hand_3 === null) {
                payload.p2_hand_3 = card
            } else if (y.p2_hand_4 === null) {
                payload.p2_hand_4 = card
            } else if (y.p2_hand_5 === null) {
                payload.p2_hand_5 = card
            } else if (y.p2_hand_6 === null) {
                payload.p2_hand_6 = card
            } else if (y.p2_hand_7 === null) {
                payload.p2_hand_7 = card
            }
            const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
            return update
        }
        window.location.reload()
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

    placement = async (image, type) => {
        const game = await axios.get(`/api/games/1/gamerooms/${this.props.match.params.id}`)
        const y = game.data
        let monsters = [...this.state.yourMonsters]
        let magic = [...this.state.yourMagic]
        let payload = { ...this.state }
        if (y.p2 === y.key) {
            if (type = 'monster' && monsters.length < 5) {
                monsters.push(image)
                this.setState({
                    yourMonsters: monsters
                })
            } else if (type = 'magic' && magic.length < 5) {
                console.log('in magic');
                magic.push(image)
                this.setState({
                    yourMagic: magic
                })
            }
            if (this.props.location.key !== (y.key || y.p2)) {
                payload.p1Monster1 = monsters[0]
                payload.p1Monster2 = monsters[1]
                payload.p1Monster3 = monsters[2]
                payload.p1Monster4 = monsters[3]
                payload.p1Monster5 = monsters[4]
                payload.p1Magic1 = magic[0]
                payload.p1Magic2 = magic[1]
                payload.p1Magic3 = magic[2]
                payload.p1Magic4 = magic[3]
                payload.p1Magic5 = magic[4]
            }
        }
        if ((!y.p1 && !y.p2) || (y.p2 && !y.key && y.p1 === null)) {
            if (type = 'monster' && monsters.length < 5) {
                monsters.push(image)
                this.setState({
                    yourMonsters: monsters
                })
            } else if (type = 'magic' && magic.length < 5) {
                console.log('in magic');
                magic.push(image)
                this.setState({
                    yourMagic: magic
                })
            }
            if (this.props.location.key === y.key) {
                payload.p2Monster1 = monsters[0]
                payload.p2Monster2 = monsters[1]
                payload.p2Monster3 = monsters[2]
                payload.p2Monster4 = monsters[3]
                payload.p2Monster5 = monsters[4]
                payload.p2Magic1 = magic[0]
                payload.p2Magic2 = magic[1]
                payload.p2Magic3 = magic[2]
                payload.p2Magic4 = magic[3]
                payload.p2Magic5 = magic[4]
            }
        }
        const update = await axios.patch(`/api/games/1/gamerooms/${this.props.match.params.id}`, payload)
        this.clickedCard()
        this.populateField()
        this.populateBoard('c')
        return update
    }

    imageClicked = (val) => {
        if (val === 'hand1')
            this.setState({ hand1: !this.state.hand1 })
        else if (val === 'hand2')
            this.setState({ hand2: !this.state.hand2 })
        else if (val === 'hand3')
            this.setState({ hand3: !this.state.hand3 })
        else if (val === 'hand4')
            this.setState({ hand4: !this.state.hand4 })
        else if (val === 'hand5')
            this.setState({ hand5: !this.state.hand5 })
        else if (val === 'hand6')
            this.setState({ hand6: !this.state.hand6 })
        else if (val === 'hand7')
            this.setState({ hand7: !this.state.hand7 })
        else if (val === 'hand12')
            this.setState({ hand12: !this.state.hand12 })
        else if (val === 'hand22')
            this.setState({ hand22: !this.state.hand22 })
        else if (val === 'hand32')
            this.setState({ hand32: !this.state.hand32 })
        else if (val === 'hand42')
            this.setState({ hand42: !this.state.hand42 })
        else if (val === 'hand52')
            this.setState({ hand52: !this.state.hand52 })
        else if (val === 'hand62')
            this.setState({ hand62: !this.state.hand62 })
        else if (val === 'hand72')
            this.setState({ hand72: !this.state.hand72 })
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

    populateField = () => {
        console.log('mons', this.state.yourMonsters);

        const yourMonsters = this.state.yourMonsters.map((monster, i) => {
            return <div key={i}><img src={monster} alt='omg' /></div>
        })
        const yourMagic = this.state.yourMagic.map((magic, i) => {
            return <div key={i}><img src={magic} alt='omg' /></div>
        })
        const theirMonsters = this.state.theirMonsters.map((monster, i) => {
            return <div key={i}><img src={monster} alt='omg' /></div>
        })
        const theirMagic = this.state.theirMagic.map((magic, i) => {
            return <div key={i}><img src={magic} alt='omg' /></div>
        })
        return (
            <div>
                <div>{theirMagic}</div>
                <div>{theirMonsters}</div>
                <div>{yourMonsters}</div>
                <div>{yourMagic}</div>
            </div>
        )
    }

    render() {

        const x = this.state.game.data

        if (!this.state.game.data && (this.state.playerOne || this.state.playerTwo)) {
            return <button onClick={() => window.location.reload()}>Ready</button>
        }
        if (!this.state.game.data) {
            return 'Loading...'
        } else if (this.state.game.data) {
            if (this.state.game && this.props.location.key === this.state.game.data.player1Key) {
                return (
                    <div><h1>first</h1>
                        {this.state.game.data
                            ?
                            <div>
                                <div>
                                    <button onClick={() => this.draw()}>Draw</button>
                                    <button onClick={() => this.completeTurn()}>Turn Complete</button>
                                    <button onClick={() => this.changeLife(100)}>-100</button>
                                    <button onClick={() => this.changeLife(1000)}>-1000</button>
                                </div>
                                <Hands>
                                    {x.p2_hand_1 ?
                                        <a onClick={() => this.imageClicked('hand12')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_2 ?
                                        <a onClick={() => this.imageClicked('hand22')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_3 ?
                                        <a onClick={() => this.imageClicked('hand32')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_4 ?
                                        <a onClick={() => this.imageClicked('hand42')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_5 ?
                                        <a onClick={() => this.imageClicked('hand52')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_6 ?
                                        <a onClick={() => this.imageClicked('hand62')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p2_hand_7 ?
                                        <a onClick={() => this.imageClicked('hand72')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                </Hands>
                                <Field className='field'>{this.populateField()}</Field>
                                <Field>
                                    <img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='deck' />
                                    {x.p2Magic1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />

                                    }
                                    {x.p2Magic5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                    {x.p2Monster1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <div>
                                    {this.state.hand1 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_1} alt='' /></a >
                                            <button onClick={() => this.placement(x.p1_hand_1, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_1, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand2 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_2} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_2, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_2, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand3 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_3} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_3, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_3, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand4 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_4} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_4, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_4, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand5 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_5} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_5, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_5, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand6 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_6} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_6, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_6, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand7 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_7} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_7, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_7, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                </div>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                    {x.p1Monster1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                    {x.p1Magic1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />

                                    }
                                    {x.p1Magic5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='deck' />
                                </Field>
                                <Hands>
                                    <a onClick={() => this.imageClicked('hand1')}><img src={x.p1_hand_1} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand2')}><img src={x.p1_hand_2} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand3')}><img src={x.p1_hand_3} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand4')}><img src={x.p1_hand_4} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand5')}><img src={x.p1_hand_5} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand6')}><img src={x.p1_hand_6} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand7')}><img src={x.p1_hand_7} alt='' /></a>
                                </Hands>
                                <div>{this.state.p1LifePoints}</div>
                                <div>{this.state.p2LifePoints}</div>
                            </div>
                            :
                            <button onClick={() => window.location.reload()}>Ready</button>
                        }
                    </div>
                )
            } else if (this.props.location.key === this.state.game.data.player2Key) {
                return (
                    <div>
                        <h1>second</h1>
                        {this.state.game.data
                            ?
                            <div>
                                <div>
                                    <button onClick={() => this.draw()}>Draw</button>
                                    <button onClick={() => this.completeTurn()}>Turn Complete</button>
                                    <button onClick={() => this.changeLife(100)}>-100</button>
                                    <button onClick={() => this.changeLife(1000)}>-1000</button>
                                </div>
                                <Hands>
                                    {x.p1_hand_1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_2 ?
                                        <a onClick={() => this.imageClicked('hand2')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_3 ?
                                        <a onClick={() => this.imageClicked('hand3')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_4 ?
                                        <a onClick={() => this.imageClicked('hand4')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_5 ?
                                        <a onClick={() => this.imageClicked('hand5')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_6 ?
                                        <a onClick={() => this.imageClicked('hand6')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                    {x.p1_hand_7 ?
                                        <a onClick={() => this.imageClicked('hand7')}><img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='' /></a>
                                        : null
                                    }
                                </Hands>
                                <Field className='field'>{this.populateField()}</Field>
                                <Field>
                                    <img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='deck' />

                                    {x.p1Magic1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Magic4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />

                                    }
                                    {x.p1Magic5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Magic5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />

                                    {x.p1Monster1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p1Monster5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p1Monster5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <div>
                                    {this.state.hand12 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_1} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_1, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_1, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand22 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_2} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_2, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_2, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand32 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_3} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_3, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_3, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand42 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_4} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_4, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_4, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand52 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_5} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_5, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_5, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand62 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_6} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_6, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_6, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand72 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_7} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_7, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_7, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                </div>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />

                                    {x.p2Monster1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Monster5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Monster5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                </Field>
                                <Field>
                                    <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='deck' />
                                    {x.p2Magic1 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic1} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic2 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic2} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic3 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic3} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    {x.p2Magic4 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic4} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />

                                    }
                                    {x.p2Magic5 ?
                                        <a onClick={() => this.imageClicked('hand1')}><img src={x.p2Magic5} alt='lkll' /></a>
                                        :
                                        <img src={'http://fc00.deviantart.net/fs70/f/2010/109/a/6/Trading_Card_Template_Back_by_BlackCarrot1129.png'} alt='' />
                                    }
                                    <img src={'https://ih1.redbubble.net/image.413906047.1240/pp,550x550.u3.jpg'} alt='deck' />
                                </Field>
                                <Hands>
                                    <a onClick={() => this.imageClicked('hand12')}><img src={x.p2_hand_1} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand22')}><img src={x.p2_hand_2} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand32')}><img src={x.p2_hand_3} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand42')}><img src={x.p2_hand_4} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand52')}><img src={x.p2_hand_5} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand62')}><img src={x.p2_hand_6} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand72')}><img src={x.p2_hand_7} alt='' /></a>
                                </Hands>
                                <div>{this.state.p1LifePoints}</div>
                                <div>{this.state.p2LifePoints}</div>
                            </div>
                            :
                            <button onClick={() => window.location.reload()}>Ready</button>
                        }
                    </div>
                )
            } else {
                return (
                    <div>
                        {this.state.game.data
                            ?
                            <div>
                                <h1>third</h1>
                                <div>
                                    <button onClick={() => this.draw()}>Draw</button>
                                    <button onClick={() => this.completeTurn()}>Turn Complete</button>
                                    <button onClick={() => this.changeLife(100)}>-100</button>
                                    <button onClick={() => this.changeLife(1000)}>-1000</button>
                                </div>
                                <div>
                                    {this.state.hand1 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_1} alt='' /></a >
                                            <button onClick={() => this.placement(x.p1_hand_1, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_1, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand2 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_2} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_2, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_2, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand3 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_3} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_3, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_3, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand4 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_4} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_4, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_4, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand5 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_5} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_5, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_5, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand6 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_6} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_6, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_6, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand7 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p1_hand_7} alt='' /></a>
                                            <button onClick={() => this.placement(x.p1_hand_7, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p1_hand_7, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand12 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_1} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_1, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_1, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand22 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_2} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_2, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_2, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand32 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_3} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_3, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_3, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand42 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_4} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_4, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_4, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand52 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_5} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_5, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_5, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand62 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_6} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_6, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_6, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }
                                    {this.state.hand72 ?
                                        <ClickedCard>
                                            <a onClick={() => this.clickedCard()}><img src={x.p2_hand_7} alt='' /></a>
                                            <button onClick={() => this.placement(x.p2_hand_7, 'monster')}>Monster</button>
                                            <button onClick={() => this.placement(x.p2_hand_7, 'magic')}>Spell/Trap</button>
                                        </ClickedCard>
                                        : null
                                    }

                                </div>
                                <Hands>
                                    <a onClick={() => this.imageClicked('hand1')}><img src={x.p1_hand_1} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand2')}><img src={x.p1_hand_2} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand3')}><img src={x.p1_hand_3} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand4')}><img src={x.p1_hand_4} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand5')}><img src={x.p1_hand_5} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand6')}><img src={x.p1_hand_6} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand7')}><img src={x.p1_hand_7} alt='' /></a>
                                </Hands>
                                <Field className='field'>{this.populateField()}</Field>
                                <Hands>
                                    <a onClick={() => this.imageClicked('hand12')}><img src={x.p2_hand_1} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand22')}><img src={x.p2_hand_2} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand32')}><img src={x.p2_hand_3} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand42')}><img src={x.p2_hand_4} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand52')}><img src={x.p2_hand_5} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand62')}><img src={x.p2_hand_6} alt='' /></a>
                                    <a onClick={() => this.imageClicked('hand72')}><img src={x.p2_hand_7} alt='' /></a>
                                </Hands>
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
    }
}


export default GameRoom
import React, { Component } from 'react'
import styled from 'styled-components'

const Field = styled.div`
    .handWrapper {
        display: grid;
        grid-template-columns: auto;
    }
    .hand img{
        overflow: hidden;
    }
`

class GameRoom extends Component {
    render() {
        return (
            <Field>
                <h1>GameRoom</h1>
                <div className='handWrapper'>
                    <div>card1</div>
                    <div>card2</div>
                </div>
            </Field>
        );
    }
}

export default GameRoom
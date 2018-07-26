import React, { Component } from 'react'

import Portrait from './portrait.png'

import './author.css'

class Author extends Component {
    constructor(props) {
        super(props)
        this.state = {
            portraitURL: Portrait,
            name: '风行',
            sign: '与其感慨路难行，不如马上出发',
        }
    }
    render() {
        return (
            <div className="author-wrapper">
                <div className="author-portrait">
                    <img src={this.state.portraitURL} className="portrait" alt="portrait" />
                </div>
                <div className="author-name">{this.state.name}</div>
                <div className="author-sign">{this.state.sign}</div>
            </div>
        )
    }
}

export default Author

import React, { Component } from 'react'
import './left.css'

import Author from './author'
import Clock from './clock'

class Left extends Component {
    constructor(props) {
        super(props)
        this.resize = this.resize.bind(this)
    }

    componentDidMount() {
        this.loadPage()
        this.screenChange()
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.resize)
        window.removeEventListener('load', this.resize)
    }

    screenChange() {
        window.addEventListener('resize', this.resize)
    }

    loadPage() {
        window.addEventListener('load', this.resize)
    }

    resize() {
        const wrapper = document.querySelector('.Left')
        if (window.innerWidth <= 436) {
            wrapper.style.marginTop = '20px'
        } else {
            wrapper.style.marginTop = `${window.innerHeight / 3}px`
        }
    }

    render() {
        return (
            <div className="Left">
                <Author />
                <Clock />
            </div>
        )
    }
}



export default Left

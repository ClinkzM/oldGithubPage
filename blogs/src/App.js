import React, { Component } from 'react'
import './App.css'

import Content from './main/content'
import Left from './left/left'
import Nav from './nav/nav'


// 程序的主入口
// class 是 es6 的语法
class App extends Component {
    render() {
        return (
            <div className="App fengxing-clear">
                <Left />
                <Nav />
                <Content />
            </div>
        )
    }
}

export default App

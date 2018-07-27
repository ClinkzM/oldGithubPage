import React, { Component } from 'react'
import './clock.css'

const Time = (props) => {
    return (
        <div className="clock-cell-wrapper">
            <div className="clock-cell">
                <div className="clock-mask" style={{height: `${props.height}%`}}></div>
                <div className="clock-text">{props.type}</div>
            </div>
        </div>
    )
}

class Clock extends Component {
    fetchData() {
        var hour = new Date(Date.now()).getHours()
        var minute = new Date(Date.now()).getMinutes()
        var second = new Date(Date.now()).getSeconds()

        this.setState({
            hour: hour,
            minute: minute,
            second: second,
        })
    }

    componentWillMount() {
        this.fetchData()
    }

    componentDidMount() {
        this.interval = window.setInterval(() => {
            this.fetchData()
        }, 1000)
    }

    componentWillUnMount() {
        // 组件被解除的时候会调用这个函数
        // 所以在这里清掉定时函数
        window.clearInterval(this.interval)
    }

    formattedTime = (time) => {
        if (time >= 10) {
            return `${time}`
        } else {
            return `0${time}`
        }
    }


    render() {
        var {hour, minute, second} = this.state
        var hourHeight = hour / 24 * 100
        var minuteHeight =  minute / 60 * 100
        var secondHeight =  second / 60 * 100

        return (
            <div className="clock-box">
                <Time type={this.formattedTime(hour)} height={hourHeight}/>
                <Time type={this.formattedTime(minute)} height={minuteHeight} />
                <Time type={this.formattedTime(second)} height={secondHeight} />
            </div>
        )
    }
}

export default Clock

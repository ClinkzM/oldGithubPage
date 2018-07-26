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
        let hour = new Date(Date.now()).getHours()
        let minute = new Date(Date.now()).getMinutes()
        let second = new Date(Date.now()).getSeconds()

        this.setState({
            hour: hour,
            minute: minute,
            second: second,
        })
    }

    componentWillMount() {
        this.fetchData()
    }

    // componentDidMount 会在组件 render 之后执行, 并且在组件生命周期内永远都只执行一次
    componentDidMount() {
        this.interval = setInterval(() => {
            this.fetchData()
        }, 1000)
    }

    // componentWillUnmount 会在组件 移除 之后执行, 并且在组件生命周期内永远都只执行一次
    componentWillUnMount() {
        // 组件被解除的时候会调用这个函数
        // 所以在这里清掉定时函数
        clearInterval(this.interval)
    }

    formattedTime = (time) => {
        if (time >= 10) {
            return time
        } else {
            return `0${time}`
        }
    }


    render() {
        let {hour, minute, second} = this.state
        let hourHeight = hour / 24 * 100
        let minuteHeight =  minute / 60 * 100
        let secondHeight =  second / 60 * 100

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

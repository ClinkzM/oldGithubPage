import React, { Component } from 'react'
import './nav.css'

const MenuList = (props) => {
    return(
        <nav id="menu" className="menu-box">
            <div className="menu-list">
                {props.menus.map((t, i) => (
                    <div className="menu-cell" key={i}>
                        <a href={t.link}>
                            <svg className="iconfont" aria-hidden="true">
                                <use xlinkHref={`#icon-${t.icon}`}></use>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </nav>
    )
}

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [{
                icon: 'home',
                link: '/oldGithubPage/',
            }, {
                icon: 'blog',
                link: '/oldGithubPage/blogs/build/index.html',
            }, {
                icon: 'app',
                link: '/oldGithubPage/apps/apps.html',
            }, {
                icon: 'github',
                link: 'https://github.com/ClinkzM/ClinkzM.github.io',
            }]
        }
    }
    handleToggleBar = (e) => {
        const bars = document.querySelector("#nav-action")
        var menu = document.querySelector("#menu")
        bars.classList.toggle('active')
        menu.classList.toggle('show')
    }

    render() {
        return (
            <div className="Nav" onClick={this.handleToggleBar}>
                <div className="nav-wrapper">
                    <div id="nav-action" className="bars">
                      <span className="bar"></span>
                    </div>
                    <MenuList menus={this.state.menus} />
                </div>
            </div>
        )
    }
}

export default Nav

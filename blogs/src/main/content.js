import React, { Component } from 'react'
import './content.css'
import BlogList from './bloglist'

const ajax = (request) => {
    const r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [{
                id: 0,
                content: "数据加载中",
                link: "",
            }],
        }
    }

    cleanData = (data) => {
        const blogs = []
        for (let i = 0; i < data.length; i++) {
            // console.log('data', data)
            const label = data[i].labels
            // console.log('label', label)
            if (label.length !== 0) {
                const labelName = data[i].labels[0].name
                if (labelName && labelName=== "oldBlog") {
                    const blog = {
                        id: i,
                        dataID: data[i].id,
                        title: data[i].title,
                        author: "@Clinkz",
                        time: new Date(data[i].created_at).toLocaleString(),
                        content: data[i].body,
                        link: "阅读全文",
                    }
                    blogs.push(blog)
                }
            }

        }
        return blogs
    }

    fetchData = () => {
        const _this = this
        const request = {
            method: 'GET',
            url: 'https://api.github.com/repos/ClinkzM/blogs/issues',
            contentType: 'application/json',
            callback: function(response) {
                // 不考虑错误情况（断网、服务器返回错误等等）
                const data = JSON.parse(response)
                const bs = _this.cleanData(data)
                const state = {
                    blogs: bs,
                }
                _this.setState(state)
            },
        }
        ajax(request)
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <div className="Content">
                <div className="fengxing-blogs">
                    <BlogList blogs={this.state.blogs}/>
                </div>
            </div>
        )
    }
}

export default Content

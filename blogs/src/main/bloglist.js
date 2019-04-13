import React, { Component } from 'react'
import './bloglist.css'

class BlogList extends Component {
    render() {
        return (
            <div className="fengxing-blogs">
                {this.props.blogs.map(blog => (
                    <div key={blog.id} className="blog-cell">
                        <h1>{blog.title}</h1>
                        <div className="blog-author">
                            <span>{blog.author}</span>
                            &nbsp;
                            <time>{blog.time}</time>
                        </div>
                        <div className="blog-content">
                            {blog.content}
                        </div>
                        <a href={'/oldGithubPage/blogs/blogID/'+blog.dataID+'.html'} data-id={blog.dataID}>
                            {blog.link}
                        </a>
                    </div>
                ))}
            </div>
        )
    }
}
export default BlogList

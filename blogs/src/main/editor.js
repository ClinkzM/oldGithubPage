import React, { Component } from 'react'
import Remarkable from 'remarkable'

import './editor.css'

class  MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    var mdString = '输入 *markdown 语法* 就能看到效果'
    this.state = {
        value: mdString,
    }
  }

  handleChange() {
    this.setState({value: this.refs.input.value})
  }

  getRawMarkup() {
    var md = new Remarkable()
    return {
      __html: md.render(this.state.value)
    }
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h1>markdown 编辑器</h1>
        <h3>原始 md 文本</h3>
        <textarea
          onChange={this.handleChange}
          ref="input"
          defaultValue={this.state.value} />
        <h3>结果预览</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    )
  }
}

export default MarkdownEditor

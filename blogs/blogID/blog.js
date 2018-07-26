var log = console.log.bind(console)

var ajax = (request) => {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = () => {
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

var cleanData = (data, dataID) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === dataID) {
            var blog = {
                id: Number(data[i].id),
                title: data[i].title,
                author: "风行",
                time: new Date(data[i].created_at).toLocaleString(),
                updateTime: new Date(data[i].updated_at).toLocaleString(),
                content: data[i].body,
            }
            return blog
        }
    }
}

// var templateNav = () => {
//     var t = `
//         <nav id="id-nav-box" class="content-box fengxing-clear">
//             <div class="menu-item"><a href="/">主页</a></div>
//             <div class="menu-item"><a href="/blogs/build/index.html">博客</a></div>
//             <div class="menu-item"><a href="/apps/apps.html">应用</a></div>
//         </nav>
//     `
//     return t
// }
//
// var insertNav = () => {
//     var html = templateNav()
//     var div = document.querySelector('.blog-container')
//     appendHtml(div, html)
// }

var templateBlog = (blog) => {
    var t = `
        <div class="blog-cell">
            <h1>${blog.title}</h1>
            <div class="blog-author">
                @<span>${blog.author}</span>
                创建于<time>${blog.time}</time>
                &nbsp;最后更新于<time>${blog.updateTime}</time>
            </div>
            <div class="blog-content">
                ${templateContent(blog)}
            </div>
        </div>
    `
    return t
}

var divideContent = (string) => {
    var arr = string.split('```')
    return arr
}

var markdownCompile = (text) => {
    var converter = new showdown.Converter()
    var md = converter.makeHtml(text)
    return md
}

var usingCodeMirror = (blog) => {
    var textArea = document.querySelectorAll('textarea')
    for (var i = 0; i < textArea.length; i++) {
        var editor = CodeMirror.fromTextArea(textArea[i], {
            // 显示行号
            lineNumbers: true,
            // 缩进单位为4
            indentUnit: 4,
            // 当前行背景高亮
            styleActiveLine: true,
            // 括号匹配
            matchBrackets: true,
            // HMTL混合模式
            mode: 'text/htmlmixed',
            mode: "text/javascript",
            mode: "text/css",
            // 自动换行
            lineWrapping: true,
             // 编辑器主题
            theme: 'dracula',
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            //括号匹配
            matchBrackets: true,
            //只读
            readOnly: true,
        })
    }
}

var templateContent = (blog) => {
    var allString = blog.content
    var a = divideContent(allString)
    var html = ''
    for (var i = 0; i < a.length; i++) {
        var includesCode = a[i].includes('Html') || a[i].includes('JavaScript') || a[i].includes('Css')
        var capital = a[i][0] === 'H' || a[i][0] === 'J' || a[i][0] === 'C'
        if (includesCode && capital) {
            var t = `
            <textarea class="form-control" name="code">
                ${a[i]}
            </textarea>
            `
        } else {
            var t = markdownCompile(a[i])
        }
        html = html + t
    }
    return html
}

var insertBlog = (blog) => {
    var html = templateBlog(blog)
    var div = document.querySelector('.fengxing-blog')
    div.innerHTML = html
}

var changeTitle = (blog) => {
    var t = document.querySelector('title')
    t.innerHTML = `${blog.author}@${blog.title}`
}

var handleDataID = () => {
    var blog = document.querySelector('.fengxing-blog')
    var id = Number(blog.dataset.id)
    return id
}

var handleData = () => {
    var request = {
        method: 'GET',
        url: 'https://api.github.com/repos/ClinkzM/blogs/issues',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            var data = JSON.parse(response)
            var dataID = handleDataID()
            var blog = cleanData(data, dataID)
            insertBlog(blog)
            changeTitle(blog)
            usingCodeMirror(blog)
        },
    }
    ajax(request)
}

var __main = () => {
    // insertNav()
    handleData()
}
__main()
